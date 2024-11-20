import { Card, CardHeader, CardContent } from "../../ui/card";
import { XStack } from "../../ui/stack";
import { Badge } from "../../ui/badge";
import { useNavigate } from "react-router-dom";
import { Clock, Flame } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Market } from "@/feature/market/interface/market.interface";
import {
  getDaysFromTimestamp,
  formatDuration,
} from "@/common/utils/time.utilts";

export interface Props extends Market {}

const MarketCard = ({
  Title,
  Timestamp,
  Creator,
  Duration,
  OptionA,
  OptionB,
  ProcessId,
  ...props
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/market/details/${ProcessId}`);
  };
  return (
    <Card
      className=" flex flex-col lg:grid lg:grid-cols-[44%_auto] cursor-pointer border-primary/50   dark:bg-transparent "
      onClick={handleNavigate}
    >
      <CardHeader className="p-4 ">
        <div className="w-full h-[200px] lg:h-full rounded-md bg-[#F0F0F0] "></div>
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
            <span className="flex gap-2 text-sm items-center">
              <Flame />
              {OptionA}
            </span>
            <span className="flex gap-2 text-sm items-center">
              <Flame />
              {OptionB}
            </span>

            <Separator />

            <span className="flex gap-2 text-sm items-center">
              <Clock />
              {props.Concluded
                ? "Concluded"
                : `${formatDuration(Number(Duration))}`}
            </span>
          </span>
          <div className="flex justify-start items-start my-4 flex-col space-y-2">
            <Badge className="space-x-2">
              <span>{getDaysFromTimestamp(Number(Timestamp))}</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
