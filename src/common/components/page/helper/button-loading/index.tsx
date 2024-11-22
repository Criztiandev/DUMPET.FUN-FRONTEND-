import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import { buttonVariants } from "@/common/components/atoms/ui/button";
import { Wallet } from "lucide-react";

const ButtonLoading = () => {
  return (
    <Skeleton
      className={buttonVariants({
        variant: "ghost",
        className: "justify-start px-2 space-x-2",
      })}
    >
      <Wallet />
      <span>Loading</span>
    </Skeleton>
  );
};

export default ButtonLoading;
