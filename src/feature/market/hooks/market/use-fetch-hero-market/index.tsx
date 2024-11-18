import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchHeroMarket = () => {
  return useSuspenseQuery({
    queryKey: [`/GET /market/hero`],
    queryFn: async () => {
      const result = await dryrun({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: [{ name: "Action", value: "RandomMarket" }],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchHeroMarket;
