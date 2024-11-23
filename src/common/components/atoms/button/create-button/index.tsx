import { Button } from "../../ui/button";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/common/lib/utils";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const isSmallScreen = useIsMobile();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create/market");
  };

  return (
    <Button
      className={cn(`${isSmallScreen && "w-full"} space-x-2`)}
      onClick={handleNavigate}
      variant={"outline"}
    >
      <Star size={18} />
      <span>Create</span>
    </Button>
  );
};

export default CreateButton;
