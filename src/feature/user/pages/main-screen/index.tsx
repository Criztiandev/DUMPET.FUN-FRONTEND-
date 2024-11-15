import Topbar from "@/common/components/template/layout/topbar";
import HeroCard from "@/common/components/atoms/card/hero-card";
import FilterMenu from "@/common/components/molecules/menu/filter-menu";
import SearchInput from "@/common/components/molecules/input/search-input";
import { Button } from "@/common/components/atoms/ui/button";
import { Market } from "@/feature/market/interface/market.interface";
import MarketCard from "@/common/components/atoms/card/market-card";
import useMarketStore from "@/feature/market/store/market.store";
import UseFetchMarket from "../../../market/hooks/market/use-fetch-market";

const MainScreen = () => {
  const { filteredMarket, selectedMarket, searchTerm } = useMarketStore();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = UseFetchMarket();

  return (
    <div className="min-h-screen w-full">
      <Topbar />
      <main className="p-4 my-24">
        {/* Search and Filter Section */}
        <section>
          <div className="max-w-[700px] flex items-center gap-2 mx-auto">
            <SearchInput />
            <FilterMenu />
          </div>

          <div className="my-8">
            {selectedMarket && searchTerm.toString().length === 0 && (
              <HeroCard {...selectedMarket} />
            )}
          </div>
        </section>

        {/* Markets Grid Section */}
        <section className="space-y-8">
          {filteredMarket.length <= 0 ? (
            <div className="flex w-full justify-center items-center flex-col gap-4">
              <div className="w-[200px] h-[200px] border rounded-md"></div>
              <span className="text-2xl font-bold">No Market Found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMarket.map((market: Market) => (
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
      </main>
    </div>
  );
};

export default MainScreen;
