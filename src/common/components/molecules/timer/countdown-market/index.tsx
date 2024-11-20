import { buttonVariants } from "@/common/components/atoms/ui/button";
import { cn } from "@/common/lib/utils";
import { Clock } from "lucide-react";
import { useState } from "react";

const CountdownMarket = () => {
  const [time, setTime] = useState("3:00");
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline", className: "flex gap-2" })
      )}
    >
      <Clock size={16} />
      <span>{time}</span>
    </div>
  );
};

export default CountdownMarket;
