import { Button } from "../../ui/button";
import { Coins } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/common/lib/utils";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const isSmallScreen = useIsMobile();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create/bet");
  };

  return (
    <Button
      className={cn(`${isSmallScreen && "w-full"} space-x-2`)}
      variant="outline"
      onClick={handleNavigate}
    >
      <Coins size={18} />
      <span>Create Bet</span>
    </Button>
  );
};

export default CreateButton;
