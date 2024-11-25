import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchHeroMarket = () => {
  return useSuspenseQuery({
    queryKey: [`/GET /market/hero-market`],
    queryFn: async () => {
      const result = await dryrun({
        process: "jIRuxblllcBIDUmYbrbbEI90nJs40duNA6wR6NkYVvI",
        tags: [{ name: "Action", value: "RandomMarket" }],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchHeroMarket;
