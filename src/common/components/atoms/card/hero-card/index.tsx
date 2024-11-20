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
import {
  getDaysFromTimestamp,
  formatDuration,
} from "@/common/utils/time.utilts";

interface Props extends MarketInfo {}

const HeroCard = ({
  Title,
  Timestamp,
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
      <div onClick={() => navigate(`/market/details/${ProcessId}`)}>
        <CardContainer className="inter-var cursor-pointer">
          <CardBody className="bg-card border- dark:bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-primary/30 dark:border-primary/30  ">
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
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  {Concluded
                    ? "Concluded"
                    : `${formatDuration(Number(Duration))}`}
                </span>
              </CardItem>
              <div className="flex justify-between items-center ">
                <CardItem
                  translateZ={70}
                  as="div"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  {getDaysFromTimestamp(Number(Timestamp))}
                </CardItem>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default HeroCard;
