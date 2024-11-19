import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";

import { FormProvider, useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMarketDetails from "@/common/components/template/details/mobile-market-action";
import { Clock } from "lucide-react";
import { XStack } from "@/common/components/atoms/ui/stack";
import { Button } from "@/common/components/atoms/ui/button";
import { Badge } from "@/common/components/atoms/ui/badge";
import { toast } from "sonner";
import DesktopMarketAction from "@/common/components/template/details/desktop-market-action";

const DetailsScreen = () => {
  const form = useForm();
  const isMobile = useIsMobile();

  const handleConclude = () => {
    toast("Invalid Action", {
      position: "top-center",
      description: "The time is not yet concluded",
      style: {
        background: "#E43E3F",
        color: "white",
      },
    });
  };

  return (
    <section className="w-full min-h-full relative">
      <Topbar />
      <div className="mt-24 flex flex-col lg:grid lg:grid-cols-[auto_32%]">
        <div className="p-4 w-full relative ">
          <BarChart />

          {isMobile ? (
            <div className=" justify-center items-center mt-4 w-full mx-auto">
              <XStack className="gap-4 w-full  flex justify-center items-center">
                <Button className="flex gap-2" variant="outline" disabled>
                  <Clock size={16} />
                  <span>3:00</span>
                </Button>
                <Button onClick={handleConclude} className="relative">
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full w-[18px] h-[18px] p-0 flex justify-center items-center"
                  >
                    5
                  </Badge>
                  <span>Conclude</span>
                </Button>
              </XStack>
            </div>
          ) : (
            <div className="absolute top-0 right-0 p-4 m-4">
              <XStack className="gap-4">
                <Button className="flex gap-2" variant="outline" disabled>
                  <Clock size={16} />
                  <span>3:00</span>
                </Button>
                <Button onClick={handleConclude} className="relative">
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full w-[18px] h-[18px] p-0 flex justify-center items-center"
                  >
                    5
                  </Badge>
                  <span>Conclude</span>
                </Button>
              </XStack>
            </div>
          )}
        </div>

        <FormProvider {...form}>
          {isMobile ? <MobileMarketDetails /> : <DesktopMarketAction />}
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
