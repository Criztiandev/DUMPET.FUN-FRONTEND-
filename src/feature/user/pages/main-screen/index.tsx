import Topbar from "@/common/components/template/layout/topbar";
import FilterMenu from "@/common/components/molecules/menu/filter-menu";
import SearchInput from "@/common/components/molecules/input/search-input";
import { useActiveAddress } from "arweave-wallet-kit";
import { Suspense, useEffect } from "react";
import { useAccountStore } from "../../store/account-store";
import MarketInfiniteList from "./containers/market-infinite-list";
import CardLoadingScreen from "@/common/components/page/helper/card-loading-screen";
import HeroCardLoadingScreen from "@/common/components/page/helper/hero-card-loading-screen";
import MarketHero from "./containers/market-hero";

const MainScreen = () => {
  const address = useActiveAddress();
  const { setAddres } = useAccountStore();

  useEffect(() => {
    if (address) {
      setAddres(address);
    }
  }, [address]);

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

          <Suspense fallback={<HeroCardLoadingScreen />}>
            <MarketHero />
          </Suspense>
        </section>

        {/* Markets Grid Section */}
        <Suspense fallback={<CardLoadingScreen />}>
          <MarketInfiniteList />
        </Suspense>
      </main>
    </div>
  );
};

export default MainScreen;
