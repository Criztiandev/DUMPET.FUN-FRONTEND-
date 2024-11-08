import { Card, CardHeader, CardContent } from "../../ui/card";
import { XStack } from "../../ui/stack";
import { Badge } from "../../ui/badge";
import { BetPayload } from "@/feature/bet/interface/bet-card.interface";
import { useNavigate } from "react-router-dom";

export interface Props extends BetPayload {}

const BetCard = ({ url, title, details, author, mcap, createdAt }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details/${12313123}`);
  };
  return (
    <Card
      className="grid grid-cols-[44%_auto] cursor-pointer hover:border hover:border-stone-400"
      onClick={handleNavigate}
    >
      <CardHeader className="p-4 ">
        <div className="w-full h-full rounded-md bg-[#F0F0F0]"></div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-bold text-lg">
            {title.length > 25
              ? `${title.substring(0, 20)}...`
              : title || "Thonald Dump"}
          </h3>
          <XStack className="gap-2 opacity-60">
            <span className="text-sm font-semibold">Created by</span>
            <span className="text-purple-400 font-semibold text-sm">
              {author || "Joe Doe"}
            </span>
          </XStack>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{details}</span>
          <div className="flex justify-start items-start my-4 flex-col space-y-2">
            <span className="font-semibold">MCAP: ${mcap}</span>
            <Badge>
              {createdAt.toString().length > 3
                ? `${createdAt.toString().substring(0, 3)}...`
                : createdAt}{" "}
              days ago
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetCard;
