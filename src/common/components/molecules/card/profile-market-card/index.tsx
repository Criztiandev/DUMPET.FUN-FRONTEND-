import { Badge } from "@/common/components/atoms/ui/badge";
import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/common/components/atoms/ui/button";
import ShareTwitterButton from "@/common/components/atoms/button/share-twitter-button";

interface Props {
  Title: string;
  MarketProcessId: string;
}

const ProfileMarketCard = ({ Title, MarketProcessId }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 md:flex-wrap md:items-be md:flex-row gap-y-4 border-b mb-4 border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
      <dl className="w-1/2 sm:w-48">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Bet ID:
        </dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <span className="break-words md:break-normal">#{Title}</span>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto"></dl>

      <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto"></dl>

      <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
          Status:
        </dt>
        <dd>
          <Badge className="space-x-2 bg-green-900 text-white py-1">
            <Coins size={18} />
            <span>Done</span>
          </Badge>
        </dd>
      </dl>

      <Button onClick={() => navigate(`/market/details/${MarketProcessId}`)}>
        View Result
      </Button>
      <ShareTwitterButton processID={MarketProcessId} />
    </div>
  );
};

export default ProfileMarketCard;
