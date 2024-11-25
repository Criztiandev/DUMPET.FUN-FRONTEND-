import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchAllCreatedMarket = (walletAddress: string) => {
  return useSuspenseQuery({
    queryKey: [`/GET /created/market/list/${walletAddress}`],
    queryFn: async () => {
      if (!walletAddress) {
        throw new Error("Wallet address doesnt exist");
      }

      const result = await dryrun({
        process: "jIRuxblllcBIDUmYbrbbEI90nJs40duNA6wR6NkYVvI",
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
