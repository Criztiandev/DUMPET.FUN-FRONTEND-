import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchAccountBalance = (id: string) => {
  return useSuspenseQuery({
    queryKey: [`/GET /account/balance/${id}`],
    queryFn: async () => {
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      const result = await dryrun({
        process: id,
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
  });
};

export default useFetchAccountBalance;
