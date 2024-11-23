import { Skeleton } from "@/common/components/atoms/ui/skeleton";
import { buttonVariants } from "@/common/components/atoms/ui/button";
import { Wallet } from "lucide-react";
import { cn } from "@/common/lib/utils";

interface Props {
  className?: string;
}

const ButtonLoading = ({ className }: Props) => {
  return (
    <Skeleton
      className={buttonVariants({
        variant: "ghost",
        className: cn("justify-start px-2 space-x-2", className),
      })}
    >
      <Wallet />
      <span>Loading</span>
    </Skeleton>
  );
};

export default ButtonLoading;
