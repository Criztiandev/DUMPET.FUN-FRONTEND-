import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchMarketById = (id: string) => {
  return useSuspenseQuery({
    queryKey: [`/GET /market/details/${id}`],
    queryFn: async () => {
      const result = await dryrun({
        process: id,
        tags: [{ name: "Action", value: "GetMarketInfo" }],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);

      console.log(payload);
      return payload;
    },
  });
};

export default useFetchMarketById;