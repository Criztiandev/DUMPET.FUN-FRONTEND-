import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/common/components/atoms/ui/3d-card";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { Clock, Flame } from "lucide-react";
import { Separator } from "../../ui/separator";
import { XStack } from "../../ui/stack";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "@/common/utils/time.utilts";
import HeroImage from "@/assets/image/cover-img.jpg";
import { Button } from "../../ui/button";

interface Props extends MarketInfo {}

const HeroCard = ({
  Title,
  Creator,
  Duration,
  OptionA,
  OptionB,
  ProcessId,
  Concluded,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-center items-center">
      <div onClick={() => navigate(`/market/${ProcessId}`)}>
        <CardContainer className="inter-var cursor-pointer">
          <CardBody className="bg-card dark:bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-primary/30 dark:border-primary/30  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white capitalize"
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg capitalize">{Title}</h3>
                <XStack className="gap-2 opacity-60">
                  <span className="text-sm ">Created by</span>
                  <span className="text-purple-400  text-sm">
                    {Creator.substring(0, 15) +
                      "..." +
                      Creator.substring(15, 32) || "Joe Doe"}
                  </span>
                </XStack>
              </div>
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <img
                src={HeroImage}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="mt-4 flex flex-col gap-4">
              <CardItem
                as="div"
                translateZ="60"
                className="flex flex-col gap-2 w-full "
              >
                <XStack className="justify-between px-2">
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
                </XStack>

                <Separator />

                <span className="flex gap-2 text-sm items-center">
                  <Clock />
                  {Concluded
                    ? "Concluded"
                    : `${formatDuration(Number(Duration))}`}
                </span>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default HeroCard;
