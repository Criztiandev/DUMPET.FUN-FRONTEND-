import { useAccountStore } from "@/feature/user/store/account-store";
import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchAllCreatedMarket = () => {
  const { address } = useAccountStore();

  return useSuspenseQuery({
    queryKey: [`/GET /${address}/created/market/list`],
    queryFn: async () => {
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      const result = await dryrun({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: [
          { name: "Action", value: "Creator" },
          {
            name: "ProfileId",
            value: walletAddress,
          },
        ],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchAllCreatedMarket;
