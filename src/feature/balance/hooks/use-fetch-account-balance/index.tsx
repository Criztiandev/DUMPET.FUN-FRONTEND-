import { Market } from "@/feature/market/interface/market.interface";
import useMarketStore from "@/feature/market/store/market.store";
import { useAccountStore } from "@/feature/user/store/account-store";
import { dryrun } from "@permaweb/aoconnect";
import { useQuery } from "@tanstack/react-query";

const useFetchAccountBalance = () => {
  const { selectedMarket } = useMarketStore();
  const { isOnline } = useAccountStore();
  const marketInfo = (selectedMarket as Market)?.MarketInfo;

  return useQuery({
    queryKey: [`/GET /account/balance/${marketInfo?.ProcessId}`],
    queryFn: async () => {
      // Validate process ID
      if (!marketInfo?.ProcessId) {
        throw new BalanceFetchError("Process ID is not available");
      }

      const walletAddress = await window.arweaveWallet.getActiveAddress();
      const result = await dryrun({
        process: String(marketInfo.ProcessId),
        tags: [
          { name: "Action", value: "UserBalancesAllVotes" },
          {
            name: "Recipient",
            value: walletAddress,
          },
        ],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
    enabled: isOnline && !!marketInfo?.ProcessId,
  });
};

export default useFetchAccountBalance;

class BalanceFetchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "BalanceFetchError";
  }
}
