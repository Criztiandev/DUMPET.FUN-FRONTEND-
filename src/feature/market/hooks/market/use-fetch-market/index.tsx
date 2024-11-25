import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { dryrun } from "@permaweb/aoconnect";
import useMarketStore from "@/feature/market/store/market.store";
import {
  Market,
  MarketResponse,
} from "@/feature/market/interface/market.interface";
import { useEffect } from "react";

// sort the market from latest to old

const UseFetchMarket = () => {
  const { setMarkets, markets } = useMarketStore();

  const query = useSuspenseInfiniteQuery({
    queryKey: ["/GET /market/lists"],
    queryFn: async ({ pageParam = 1 }) => {
      const { Messages } = await dryrun({
        process: process.env.VITE_DEV_MAIN_PROCESS_ID || "",
        tags: [
          { name: "Action", value: "List" },
          { name: "Page", value: pageParam.toString() },
        ],
      });

      const payload: MarketResponse = JSON.parse(Messages[0]?.Data);

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

  useEffect(() => {
    if (query.data) {
      const allMarket = query.data.pages.reduce<Market[]>((acc, page) => {
        return acc.concat(page.markets || []);
      }, []);

      // Only update if the markets have changed, sort the market if concluded there fore
      if (JSON.stringify(allMarket) !== JSON.stringify(markets)) {
        setMarkets(allMarket);
      }
    }
  }, [query.data]);

  return query;
};

export default UseFetchMarket;
