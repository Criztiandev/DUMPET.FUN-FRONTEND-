import { Card, CardContent } from "../../ui/card";
import { XStack } from "../../ui/stack";
import { Link } from "react-router-dom";
import { Clock, Flame } from "lucide-react";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { formatDuration } from "@/common/utils/time.utilts";
import ShareTwitterButton from "../../button/share-twitter-button";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

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
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // /market/${ProcessId}

  return (
    <Link className="w-full" to={`/market/${ProcessId}`}>
      <Card className=" flex flex-col cursor-pointer border-primary/50   dark:bg-transparent ">
        <CardContent className="p-4 flex flex-col justify-center">
          <div className="mb-4 flex justify-center  flex-col">
            <h3 className="font-bold text-lg capitalize text-center my-2">
              {Title.length > 25
                ? `${Title.substring(0, 20)}...`
                : Title || "Thonald Dump"}
            </h3>

            <XStack className="gap-2 opacity-60 flex justify-center items-center mb-4">
              <span className="text-sm ">Created by</span>
              <span className="text-purple-400  text-sm">
                {Creator.substring(0, 5) + "..." + Creator.substring(10, 15) ||
                  "Joe Doe"}
              </span>
            </XStack>
          </div>

          <div className="mx-16">
            <Separator className="mb-4" />
          </div>

          <div className="flex flex-col">
            <span className="flex flex-col gap-2  ">
              <div className="flex justify-between gap-4  items-center flex-col">
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

          <div className="mx-16">
            <Separator className="mb-4" />
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
    </Link>
  );
};

export default MarketCard;
