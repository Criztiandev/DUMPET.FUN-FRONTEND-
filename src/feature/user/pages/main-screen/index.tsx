import Topbar from "@/common/components/template/layout/topbar";
import { Suspense } from "react";
import MarketInfiniteList from "./containers/market-infinite-list";
import CardLoadingScreen from "@/common/components/page/helper/card-loading-screen";
import HeroCardLoadingScreen from "@/common/components/page/helper/hero-card-loading-screen";
import MarketHero from "./containers/market-hero";

const MainScreen = () => {
  return (
    <div className="min-h-screen w-full">
      <Topbar />
      <main className="p-4 mt-24">
        {/* Search and Filter Section */}
        <section>
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
