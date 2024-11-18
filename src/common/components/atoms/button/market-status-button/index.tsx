import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Store } from "lucide-react";

const MarketStatusButton = () => {
  const handleMarketStatus = () => {
    toast("No market is Pending", {
      position: "top-center",
      style: {
        background: "#3182CE",
        color: "white",
      },
    });
  };

  return (
    <Button
      className="w-full space-x-2"
      variant="ghost"
      onClick={handleMarketStatus}
    >
      <Store size={18} />
      <span>Market Status</span>
    </Button>
  );
};

export default MarketStatusButton;
