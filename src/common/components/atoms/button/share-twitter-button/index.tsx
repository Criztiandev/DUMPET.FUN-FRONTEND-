import { Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import useShareMarket from "@/feature/market/hooks/market/use-share-market";

interface Props {
  processID: string;
}

const ShareTwitterButton = ({ processID }: Props) => {
  const shareMarket = useShareMarket(processID);
  return (
    <Button size="icon" variant="ghost" onClick={shareMarket}>
      <Share2 size={18} />
    </Button>
  );
};

export default ShareTwitterButton;
