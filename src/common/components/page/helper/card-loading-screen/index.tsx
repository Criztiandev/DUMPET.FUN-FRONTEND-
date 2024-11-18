import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import { cn } from "@/common/lib/utils";
import React from "react";

const CardLoadingScreen = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
      <Skeleton className="w-full h-[250px]" />
    </div>
  );
};

export default CardLoadingScreen;
