import HeroCard from "@/common/components/atoms/card/hero-card";
import useFetchHeroMarket from "@/feature/market/hooks/market/use-fetch-hero-market";

const MarketHero = () => {
  const { data } = useFetchHeroMarket();

  return (
    <div className="my-8">
      <HeroCard {...data} />
    </div>
  );
};

export default MarketHero;
