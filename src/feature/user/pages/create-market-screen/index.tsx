import DatePickerWithPreset from "@/common/components/atoms/form/DatePickerWithPreset";
import InputField from "@/common/components/atoms/form/InputField";
import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import CreateMarketTopbar from "@/common/components/template/layout/create-market-topbar";
import { cn } from "@/common/lib/utils";
import useCreateMarket from "@/feature/market/hooks/market/use-create-market";
import { MarketFormValue } from "@/feature/market/interface/market.interface";
import { FormProvider } from "react-hook-form";

const CreateMarketCreen = () => {
  const { form, mutation } = useCreateMarket();
  const onSubmit = (data: MarketFormValue) => {
    // Convert date and time to Unix timestamp
    const date = new Date(data.date);
    const [hours, minutes] = data.time.split(":").map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const unixDuration = Math.floor(date.getTime() / 1000) * 1000;

    const { date: _, time: __, ...formData } = data;

    // Add Duration field and submit
    mutation.mutate({
      ...formData,
      Duration: unixDuration.toString(),
    });
  };
  return (
    <div className="w-full min-h-screen">
      <CreateMarketTopbar />

      <div className="flex flex-col justify-center items-center h-full absolute left-0 top-0 w-full z-10">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold my-4">Create Market</h1>
        </div>
        <div className="max-w-lg mx-auto   p-4 rounded-md ">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="TokenTxId"
                name="TokenTxId"
                placeholder="Enter TokenTxId"
              />
              <InputField
                label="Title"
                name="Title"
                placeholder="Enter title"
              />

              <DatePickerWithPreset label="Duration" />
              <div className="flex justify-between items-end gap-4">
                <InputField
                  label="Option A"
                  name="OptionA"
                  placeholder="Enter Option A"
                />

                <span className={cn(buttonVariants({ variant: "outline" }))}>
                  VS
                </span>

                <InputField
                  label="Option B"
                  name="OptionB"
                  placeholder="Enter Option B`"
                />
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                Create
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketCreen;
