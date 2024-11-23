import { Card, CardHeader, CardContent } from "../../ui/card";
import { XStack } from "../../ui/stack";
import { useNavigate } from "react-router-dom";
import { Clock, Flame } from "lucide-react";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { formatDuration } from "@/common/utils/time.utilts";
import HeroCover from "@/assets/image/cover-img.jpg";
import ShareTwitterButton from "../../button/share-twitter-button";
import { Button } from "../../ui/button";

export interface Props extends MarketInfo {}
// market-action-controls
const MarketCard = ({
  Title,
  Creator,
  Duration,
  OptionA,
  OptionB,
  ProcessId,
  Concluded,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/market/details/${ProcessId}`);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className=" flex flex-col lg:grid lg:grid-cols-[44%_auto] cursor-pointer border-primary/50   dark:bg-transparent "
      onClick={handleNavigate}
    >
      <CardHeader className="p-4 ">
        <img
          src={HeroCover}
          className=" w-full h-[200px] lg:h-full rounded-md object-cover"
        />
        {/* <div className="w-full h-[200px] lg:h-full rounded-md bg-[#F0F0F0] "></div> */}
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-bold text-lg capitalize">
            {Title.length > 25
              ? `${Title.substring(0, 20)}...`
              : Title || "Thonald Dump"}
          </h3>
          <XStack className="gap-2 opacity-60">
            <span className="text-sm ">Created by</span>
            <span className="text-purple-400  text-sm">
              {Creator.substring(0, 5) + "..." + Creator.substring(10, 15) ||
                "Joe Doe"}
            </span>
          </XStack>
        </div>
        <div className="flex flex-col">
          <span className="flex flex-col gap-2  ">
            <div className="grid grid-cols-[auto_15%_auto] gap-4 justify-center items-center">
              <span className="flex gap-2 text-sm items-center">
                <Flame fill="#dc2626" color="#dc2626" />
                {OptionA || "Option A"}
              </span>
              <Button
                className="hover:bg-transparent border"
                size="icon"
                variant="ghost"
              >
                VS
              </Button>
              <span className="flex gap-2 text-sm items-center">
                <Flame color="#2563eb" fill="#2563eb" />
                {OptionB || "Option B"}
              </span>
            </div>

            <div className="flex justify-start items-start my-4 flex-col space-y-2"></div>
          </span>
        </div>

        <XStack className="justify-end space-x-4">
          <span className="flex gap-2 text-sm items-center">
            <Clock />
            {Concluded ? "Concluded" : `${formatDuration(Number(Duration))}`}
          </span>

          <div onClick={handleShareClick}>
            <ShareTwitterButton processID={ProcessId.toString() || ""} />
          </div>
        </XStack>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
