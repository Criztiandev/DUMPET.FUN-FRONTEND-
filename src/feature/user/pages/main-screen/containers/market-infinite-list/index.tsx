import MarketCard from "@/common/components/atoms/card/market-card";
import UseFetchMarket from "@/feature/market/hooks/market/use-fetch-market";
import { Button } from "@/common/components/atoms/ui/button";
import useMarketStore from "@/feature/market/store/market.store";

const MarketInfiniteList = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = UseFetchMarket();
  const { filteredMarket } = useMarketStore();

  return (
    <section className="space-y-8">
      {filteredMarket.length <= 0 ? (
        <div className="flex w-full justify-center items-center flex-col gap-4">
          <div className="w-[200px] h-[200px] border rounded-md"></div>
          <span className="text-2xl font-bold">No Market Found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMarket.map((market: any) => (
            <MarketCard {...market} />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default MarketInfiniteList;
