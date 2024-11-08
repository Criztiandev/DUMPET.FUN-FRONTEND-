import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/common/components/atoms/ui/3d-card";
const HeroCard = () => {
  return (
    <CardContainer className="inter-var cursor-pointer">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Tonal Dump (DRUMP)
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
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            I was a complete failure as VP therefore according to the rules of
            equity and inclusion, I was a complete failure as VP therefore
            according to the rules of equity and inclusion I was a complete
            failure as VP therefore according to the rules of equity and
            inclusion
          </CardItem>
          <div className="flex justify-between items-center ">
            <CardItem
              translateZ={20}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="py-2 rounded-xl tex-xl font-bold  dark:text-white"
            >
              MCAP: $2,776.91
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              4 day ago
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default HeroCard;
