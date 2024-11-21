import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useActiveAddress } from "arweave-wallet-kit";

const useFetchPendingMarket = () => {
  const activeAddress = useActiveAddress();
  return useSuspenseQuery({
    queryKey: [`/GET /market/${activeAddress}/pending`],
    queryFn: async () => {
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      const result = await dryrun({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: [
          { name: "Action", value: "HasWaitFor" },
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

export default useFetchPendingMarket;
