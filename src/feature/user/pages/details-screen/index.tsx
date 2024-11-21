import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";

import { FormProvider, useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMarketDetails from "@/common/components/template/details/mobile-market-action";
import { XStack } from "@/common/components/atoms/ui/stack";
import DesktopMarketAction from "@/common/components/template/details/desktop-market-action";
import { useParams } from "react-router-dom";
import useFetchMarketById from "@/feature/market/hooks/market/use-fetch-market-by-id";
import { Suspense, useEffect } from "react";
import MarketActionLoadingScreen from "@/common/components/page/helper/market-action-loading-screen";
import useMarketStore from "@/feature/market/store/market.store";
import ConcludeButton from "@/common/components/atoms/button/conclude-button";
import CountdownMarket from "@/common/components/molecules/timer/countdown-market";
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";
import useBalanceStore from "../../store/balance-store";

const DetailsScreen = () => {
  const { id: marketID } = useParams();
  const form = useForm();
  const isMobile = useIsMobile();
  const { setSelectedMarket } = useMarketStore();
  const { setBalance } = useBalanceStore();

  const { data: marketResult } = useFetchMarketById(marketID || "");
  const { data: balanceResult } = useFetchAccountBalance(marketID || "");

  useEffect(() => {
    if (marketResult) {
      setSelectedMarket(marketResult);
    }
  }, [marketResult]);

  useEffect(() => {
    if (balanceResult) {
      setBalance(balanceResult);
    }
  }, [balanceResult]);

  return (
    <section className="w-full min-h-full relative">
      <Topbar />
      <div className="mt-24 flex flex-col lg:grid lg:grid-cols-[auto_32%]">
        <div className="p-4 w-full relative ">
          <BarChart />

          {isMobile ? (
            <div className=" justify-center items-center mt-4 w-full mx-auto">
              <XStack className="gap-4 w-full  flex justify-center items-center">
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
          {isMobile ? (
            <MobileMarketDetails />
          ) : (
            <Suspense fallback={<MarketActionLoadingScreen />}>
              <DesktopMarketAction />
            </Suspense>
          )}
        </FormProvider>
      </div>
    </section>
  );
};

export default DetailsScreen;
