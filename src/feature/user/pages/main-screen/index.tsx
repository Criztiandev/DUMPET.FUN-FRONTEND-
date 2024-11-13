import Topbar from "@/common/components/template/layout/topbar";
import HeroCard from "@/common/components/atoms/card/hero-card";
import BetCard from "@/common/components/atoms/card/bet-card";
import FilterMenu from "@/common/components/molecules/menu/filter-menu";
import SearchInput from "@/common/components/molecules/input/search-input";
import UseFetchMarket from "../../hooks/market/use-fetch-market";
import { Button } from "@/common/components/atoms/ui/button";
import { Market } from "@/feature/bet/interface/market.interface";

const MainScreen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    UseFetchMarket();

  // Combine all markets from all pages into a single array
  const allMarkets =
    data?.pages?.reduce((acc, page) => {
      return acc.concat(page.markets || []);
    }, []) || [];

  return (
    <div className="min-h-screen w-full">
      <Topbar />
      <main className="p-4">
        {/* Search and Filter Section */}
        <section>
          <div className="max-w-[700px] flex items-center gap-2 mx-auto">
            <SearchInput />
            <FilterMenu />
          </div>

          <div className="my-8">
            <HeroCard />
          </div>
        </section>

        {/* Markets Grid Section */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allMarkets.map((market: Market) => (
              <BetCard key={market.TokenTxId || market.Title} {...market} />
            ))}
          </div>

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
