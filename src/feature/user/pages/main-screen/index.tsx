import Topbar from "@/common/components/template/layout/topbar";
import HeroCard from "@/common/components/atoms/card/hero-card";
import betListData from "@/feature/bet/data/bet-list.data";
import BetCard from "@/common/components/atoms/card/bet-card";
import FilterMenu from "@/common/components/molecules/menu/filter-menu";
import SearchInput from "@/common/components/molecules/input/search-input";

const MainScreen = () => {
  return (
    <div className="min-h-screen w-full">
      <Topbar />
      <main className="p-4">
        <section>
          <div className="max-w-[700px] flex items-center gap-2 mx-auto">
            <SearchInput />
            <FilterMenu />
          </div>

          <div className="my-8">
            <HeroCard />
          </div>
        </section>
        <section>
          <div className="grid grid-cols-3 gap-4">
            {betListData?.map((items) => (
              <BetCard key={items.title} {...items} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainScreen;
