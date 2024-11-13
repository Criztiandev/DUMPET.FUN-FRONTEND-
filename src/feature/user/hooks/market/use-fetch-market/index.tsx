import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { dryrun } from "@permaweb/aoconnect";

const UseFetchMarket = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["/GET /market/list"],
    queryFn: async ({ pageParam = 1 }) => {
      const { Messages } = await dryrun({
        process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
        tags: [
          { name: "Action", value: "List" },
          { name: "Page", value: pageParam.toString() },
        ],
      });

      const payload = JSON.parse(Messages[0]?.Data);

      console.log(payload);

      return {
        markets: payload.Markets,
        currentPage: payload.CurrentPage,
        hasMore: payload.HasMore,
        totalRecords: payload.TotalRecords,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default UseFetchMarket;
