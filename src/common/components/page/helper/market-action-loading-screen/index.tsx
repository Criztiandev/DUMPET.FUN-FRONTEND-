import { Skeleton } from "@/common/components/atoms/ui/skeleton";

const MarketActionLoadingScreen = () => {
  return (
    <div className="p-4">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default MarketActionLoadingScreen;
