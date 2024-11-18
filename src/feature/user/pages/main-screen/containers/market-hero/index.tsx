import HeroCard from "@/common/components/atoms/card/hero-card";
import useFetchHeroMarket from "@/feature/market/hooks/market/use-fetch-hero-market";
import useMarketStore from "@/feature/market/store/market.store";

const MarketHero = () => {
  const { searchTerm } = useMarketStore();
  const { data } = useFetchHeroMarket();

  return (
    <div className="my-8">
      <HeroCard {...data} />
    </div>
  );
};

export default MarketHero;
