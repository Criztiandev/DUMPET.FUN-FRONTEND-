import { Button } from "../../ui/button";
import useMarketStore from "@/feature/market/store/market.store";
import useMarketConclude from "@/feature/market/hooks/market/user-market-conclude";
// import { isMarketConcluded } from "@/common/utils/time.utilts";
const ConcludeButton = () => {
  const { selectedMarket } = useMarketStore();
  const { mutate, isPending } = useMarketConclude(
    String(selectedMarket?.MarketInfo.ProcessId) || ""
  );
  // const currentDate = new Date();
  // const isConcluded = isMarketConcluded(
  //   currentDate,
  //   Number(selectedMarket?.MarketInfo.Duration)
  // );

  const handleConclude = () => {
    mutate();
  };

  return (
    <>
      <Button
        onClick={handleConclude}
        className="relative"
        disabled={isPending}
      >
        {isPending ? "Loading..." : <span>Conclude</span>}
      </Button>
    </>
  );
};

export default ConcludeButton;
