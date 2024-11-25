import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";
import { FormProvider, useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { XStack } from "@/common/components/atoms/ui/stack";
import DesktopMarketAction from "@/common/components/template/details/desktop-market-action";
import { useParams } from "react-router-dom";
import useFetchMarketById from "@/feature/market/hooks/market/use-fetch-market-by-id";
import { useEffect } from "react";
import useMarketStore from "@/feature/market/store/market.store";
import ConcludeButton from "@/common/components/atoms/button/conclude-button";
import CountdownMarket from "@/common/components/molecules/timer/countdown-market";

const INITIAL_MARKET_STATE: any = {
  MainProcessId: "",
  MarketInfo: {
    AoTokenProcessId: "",
    Concluded: false,
    Creator: "",
    Duration: "",
    OptionA: "",
    OptionB: "",
    ProcessId: 0,
    Timestamp: 0,
    Title: "",
    TokenTxId: "",
  },
  BalancesVoteA: {},
  BalancesVoteB: {},
} as const;

const DetailsScreen = () => {
  const { id: marketID } = useParams();
  const form = useForm();
  const isMobile = useIsMobile();
  const { setSelectedMarket } = useMarketStore();
  const { data: marketResult } = useFetchMarketById(marketID || "");

  // In your component
  useEffect(() => {
    setSelectedMarket(marketResult || INITIAL_MARKET_STATE);
  }, [marketResult, setSelectedMarket]);

  return (
    <section className="w-full min-h-full relative">
      <Topbar />
      <div className="mt-24 flex flex-col lg:grid lg:grid-cols-[auto_32%]">
        <div className="p-4 w-full relative">
          <BarChart />

          {isMobile ? (
            <div className="justify-center items-center mt-4 w-full mx-auto">
              <XStack className="gap-4 w-full flex justify-center items-center">
                <CountdownMarket />
                <ConcludeButton />
              </XStack>
            </div>
          ) : (
            <div className="absolute top-0 right-0 p-4 m-4">
              <XStack className="gap-4">
                <CountdownMarket />
                <ConcludeButton />
              </XStack>
            </div>
          )}
        </div>

        <FormProvider {...form}>
          <DesktopMarketAction />
        </FormProvider>
      </div>
    </section>
  );
};

export default DetailsScreen;
