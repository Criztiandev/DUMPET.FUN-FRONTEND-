import { Card, CardContent } from "../../ui/card";
import { XStack, YStack } from "../../ui/stack";
import { Link } from "react-router-dom";
import { Clock, Flame } from "lucide-react";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { formatDuration, formatTimestamp } from "@/common/utils/time.utilts";
import ShareTwitterButton from "../../button/share-twitter-button";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import TokenList from "@/feature/balance/data/token-list";
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
  TokenTxId,
  Concluded,
  Timestamp,
}: Props) => {
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const token = TokenList.find((token) => token.value === TokenTxId);

  console.log(Timestamp);

  return (
    <Card className="relative flex flex-col cursor-default border-primary/50 dark:bg-transparent min-h-[300px] h-full justify-between ">
      <CardContent className="p-4 flex flex-col justify-center space-y-4">
        <XStack className="justify-between items-center">
          <Badge>{(token && token.label) || "No Token"}</Badge>
          <div onClick={handleShareClick}>
            <ShareTwitterButton processID={ProcessId.toString()} />
          </div>
        </XStack>

        <YStack>
          <div className="text-3xl font-bold">
            {Title.length > 25
              ? `${Title.substring(0, 30)}...`
              : Title || "Thonald Dump"}
          </div>
          <div className="space-x-1">
            <span className="text-sm text-stone-600">Created By:</span>
            <Link
              to={`/profile/${Creator}`}
              target="_blank"
              className="text-stone-600 text-sm hover:underline hover:underline-offset-4 hover:text-primary/70"
            >
              <span className="text-sm ">{Creator}</span>
            </Link>
          </div>
        </YStack>

        <XStack className="justify-between items-center px-2 border p-4 rounded-md bg-secondary py-6">
          <span className="flex gap-2 text-sm items-center">
            <Flame fill="#dc2626" color="#dc2626" />
            {OptionA.length > 15
              ? `${OptionA.substring(0, 15)}..`
              : OptionA || "Option A"}
          </span>

          <Badge>VS</Badge>

          <span className="flex gap-2 text-sm items-center">
            <Flame fill="#2563eb" color="#2563eb" />
            {OptionB.length > 15
              ? `${OptionB.substring(0, 15)}..`
              : OptionB || "Option B"}
          </span>
        </XStack>

        <div className="flex gap-2 items-center">
          <Clock size={18} />
          <div className="space-x-2">
            <span>Duration:</span>
            <span>{formatDuration(Number(Duration))}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Clock size={18} />
          <div className="space-x-2">
            <span>Created At:</span>
            <span>{formatTimestamp(Number(Timestamp))}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Clock size={18} />
          <div className="space-x-2">
            <span>Status:</span>
            <Badge>{Concluded ? "Ended" : "Active"}</Badge>
          </div>
        </div>
      </CardContent>

      <Separator />

      <div className="my-4 px-4 flex justify-end">
        <Link to={`/market/${ProcessId}`}>
          <Button size="sm">Vote Now</Button>
        </Link>
      </div>

      {/* <div className="absolute top-0 right-0 p-4">
          <Badge>{token?.label || "No Token"}</Badge>
        </div> */}
    </Card>
  );
};

export default MarketCard;

{
  /* <div className="mb-4 flex justify-center  flex-col">
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

<XStack className="justify-end space-x-4">
<span className="flex gap-2 text-sm items-center">
  <Clock />
  {Concluded ? "Concluded" : `${formatDuration(Number(Duration))}`}
</span>

<div onClick={handleShareClick}>
  <ShareTwitterButton processID={ProcessId.toString() || ""} />
</div>
</XStack> */
}
