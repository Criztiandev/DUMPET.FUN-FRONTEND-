import { Button } from "../../ui/button";
import useMarketStore from "@/feature/market/store/market.store";
import useMarketConclude from "@/feature/market/hooks/market/user-market-conclude";
import { isMarketDeadlineValid } from "@/common/utils/time.utilts";
const ConcludeButton = () => {
  const { selectedMarket } = useMarketStore();
  const { mutate } = useMarketConclude(
    String(selectedMarket?.MarketInfo.ProcessId) || ""
  );
  const currentDate = new Date();
  const isConcluded = isMarketDeadlineValid(
    currentDate,
    Number(selectedMarket?.MarketInfo.Duration)
  );

  const handleConclude = () => {
    mutate();
  };

  return (
    <>
      <Button
        onClick={handleConclude}
        className="relative"
        disabled={!isConcluded}
      >
        <span>Conclude</span>
      </Button>
    </>
  );
};

export default ConcludeButton;
