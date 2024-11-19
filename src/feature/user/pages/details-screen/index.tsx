import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";

import { FormProvider, useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMarketDetails from "@/common/components/template/details/mobile-market-action";
import { Card, CardContent } from "@/common/components/atoms/ui/card";

const DetailsScreen = () => {
  const form = useForm();
  const isMobile = useIsMobile();

  return (
    <section className="w-full min-h-full relative">
      <Topbar />
      <div className="mt-24 grid grid-cols-[auto_32%]">
        <div className="p-4 w-full ">
          <BarChart />
        </div>

        <FormProvider {...form}>
          {isMobile && <MobileMarketDetails />}
          <div className="p-4">
            <Card className="h-full">
              <CardContent></CardContent>
            </Card>
          </div>
        </FormProvider>
      </div>
    </section>
  );
};

export default DetailsScreen;
{
  /* <div className="w-full ">
<DetailsMainTab />
</div> */
}
