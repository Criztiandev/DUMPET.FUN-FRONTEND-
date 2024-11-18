import { Skeleton } from "@/common/components/atoms/ui/skeleton";

const HeroCardLoadingScreen = () => {
  return (
    <div className="my-8 flex justify-center items-center">
      <Skeleton className="w-[480px] h-[515px]" />
    </div>
  );
};

export default HeroCardLoadingScreen;
