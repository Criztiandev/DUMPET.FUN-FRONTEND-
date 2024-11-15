import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";

import { FormProvider, useForm } from "react-hook-form";
import SelectField from "@/common/components/atoms/form/SelectField";
import InputField from "@/common/components/atoms/form/InputField";
import { Separator } from "@/common/components/atoms/ui/separator";
import { Button } from "@/common/components/atoms/ui/button";
import { XStack } from "@/common/components/atoms/ui/stack";

const DetailsScreen = () => {
  const form = useForm();

  return (
    <section className="w-full min-h-full relative">
      <Topbar />
      <div className="mt-24">
        <div className="p-4 ">
          <BarChart />

          {/* Action Form */}
          <div className="py-4">
            <FormProvider {...form}>
              <div className="space-y-4">
                <SelectField
                  label="Selection"
                  name="selection"
                  placeholder="Select your preference"
                  options={[{ value: "Option A", label: "Option A" }]}
                />

                <Separator />

                <div className="grid grid-cols-[auto_25%] gap-4 items-center">
                  <InputField
                    type="number"
                    name="deposit"
                    placeholder="Deposit"
                  />
                  <SelectField
                    name="token"
                    placeholder="AR"
                    options={[
                      { label: "AR", value: "ar" },
                      { label: "Eth", value: "eth" },
                    ]}
                  />
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-full p-4 space-y-4">
                <Button className="w-full">Place Bet</Button>
              </div>
            </FormProvider>
          </div>
        </div>

        {/* Details Section */}
        <div>
          <XStack>
            <span className="text-sm ">Created by</span>
            <span className="text-purple-400  text-sm">Criztian</span>
          </XStack>
        </div>
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
