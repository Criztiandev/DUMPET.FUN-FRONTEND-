import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchTransactedMarket = (UID: string, walletAddress: string) => {
  return useSuspenseQuery({
    queryKey: [`/GET /account/details/${UID}`],
    queryFn: async () => {
      if (!UID) {
        throw new BalanceFetchError("Process ID is not available");
      }

      const result = await dryrun({
        process: UID,
        tags: [
          { name: "Action", value: "User" },
          { name: "ProfileId", value: walletAddress },
        ],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchTransactedMarket;

class BalanceFetchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "BalanceFetchError";
  }
}
