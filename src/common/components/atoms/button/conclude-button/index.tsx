import { toast } from "sonner";
import { Button } from "../../ui/button";
import useMarketStore from "@/feature/market/store/market.store";
import { Market } from "@/feature/market/interface/market.interface";
const ConcludeButton = () => {
  const { selectedMarket } = useMarketStore();

  const currentMarket = selectedMarket as Market;

  const handleConclude = () => {
    toast("Invalid Action", {
      position: "top-center",
      description: "The time is not yet concluded",
      style: {
        background: "#E43E3F",
        color: "white",
      },
    });
  };

  return (
    <>
      {!currentMarket?.Concluded && (
        <Button
          onClick={handleConclude}
          className="relative"
          disabled={!currentMarket?.Concluded}
        >
          <span>Conclude</span>
        </Button>
      )}
    </>
  );
};

export default ConcludeButton;
