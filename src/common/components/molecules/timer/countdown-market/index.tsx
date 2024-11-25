import { buttonVariants } from "@/common/components/atoms/ui/button";
import { cn } from "@/common/lib/utils";
import useMarketConclude from "@/feature/market/hooks/market/user-market-conclude";
import useMarketStore from "@/feature/market/store/market.store";
import { Clock } from "lucide-react";
import { Suspense, useEffect, useState, memo } from "react";

// Separate Timer component to isolate frequent updates
const Timer = memo(({ seconds }: { seconds: number }) => (
  <span className="text-gray-500 ml-1">
    ({seconds.toString().padStart(2, "0")}s)
  </span>
));

Timer.displayName = "Timer";

// Loading component
const TimerFallback = () => <span className="text-gray-500 ml-1">(00s)</span>;

const CountdownContent = memo(() => {
  const { selectedMarket, concludeMarket } = useMarketStore();
  const { mutate: concludeMutate } = useMarketConclude(
    String(selectedMarket?.MarketInfo.ProcessId) || ""
  );
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const formatTimeDuration = (milliseconds: number): string => {
    if (selectedMarket?.MarketInfo.Concluded) {
      setIsEnded(true);
      return "Ended";
    }

    if (milliseconds <= 0) {
      setIsEnded(true);
      concludeMarket();
      concludeMutate();

      return "Ended";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    setSeconds(totalSeconds % 60);

    const timeUnits = {
      year: Math.floor(totalSeconds / (365 * 24 * 60 * 60)),
      day: Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
      hour: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
      minute: Math.floor((totalSeconds % (60 * 60)) / 60),
    };

    const formatUnit = (value: number, unit: string): string => {
      if (value === 0) return "";
      const pluralS = value === 1 ? "" : "s";

      switch (unit) {
        case "hour":
          return `${value}hr${pluralS}`;
        default:
          return `${value} ${unit}${pluralS}`;
      }
    };

    const parts = Object.entries(timeUnits)
      .map(([unit, value]) => formatUnit(value, unit))
      .filter((part) => part !== "");

    if (parts.length === 0) {
      setIsEnded(true);
      return "Ended";
    }

    if (parts.length > 1) {
      const lastPart = parts.pop();
      return `${parts.join(", ")} and ${lastPart}`;
    }

    return parts[0];
  };

  useEffect(() => {
    let isMounted = true;

    const calculateTimeLeft = (): string | undefined => {
      const currentDuration: any = selectedMarket?.MarketInfo.Duration;

      if (!currentDuration) return;

      const now: number = Date.now();
      const difference: number = currentDuration - now;

      if (difference <= 0) {
        if (isMounted) {
          setIsEnded(true);
          setSeconds(0);
        }
        return "Ended";
      }

      return formatTimeDuration(difference);
    };

    if (isMounted) {
      setIsEnded(false);
      setTimeLeft(calculateTimeLeft() || "");
    }

    const timer = setInterval(() => {
      if (isMounted) {
        const timeRemaining = calculateTimeLeft();
        if (timeRemaining) {
          setTimeLeft(timeRemaining);
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [selectedMarket]);

  return (
    <span>
      {timeLeft}
      {!isEnded && seconds !== undefined && (
        <Suspense fallback={<TimerFallback />}>
          <Timer seconds={seconds} />
        </Suspense>
      )}
    </span>
  );
});

CountdownContent.displayName = "CountdownContent";

const CountdownMarket = (): JSX.Element => {
  const { selectedMarket } = useMarketStore();

  // Render nothing if no market is selected
  if (!selectedMarket) return null as any;

  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex items-center gap-2"
      )}
    >
      <Clock size={16} />
      <Suspense fallback={<span>Loading...</span>}>
        <CountdownContent />
      </Suspense>
    </div>
  );
};

export default memo(CountdownMarket);
