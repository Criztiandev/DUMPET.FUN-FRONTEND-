import DateField from "@/common/components/atoms/form/DateField";
import InputField from "@/common/components/atoms/form/InputField";
import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import CreateMarketTopbar from "@/common/components/template/layout/create-market-topbar";
import { cn } from "@/common/lib/utils";
import useCreateMarket from "@/feature/market/hooks/market/use-create-market";
import { MarketFormValue } from "@/feature/market/interface/market.interface";
import { useIsMobile } from "@/hooks/use-mobile";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

const CreateMarketCreen = () => {
  const { form, mutation } = useCreateMarket();
  const isMobile = useIsMobile();

  const onSubmit = (data: MarketFormValue) => {
    const date = new Date(data.date);
    const [hours, minutes] = data.time.split(":").map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const unixDuration = Math.floor(date.getTime() / 1000) * 1000;
    console.log(unixDuration);

    const { date: _, time: __, ...formData } = data;

    console.log(formData);

    mutation.mutate({
      ...formData,
      Duration: unixDuration.toString(),
    } as any);
    toast("Sorry, File upload is on going, wait for next update");
  };
  return (
    <div className="w-full min-h-screen">
      <CreateMarketTopbar />

      <div className="">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold my-4">Create Market</h1>
        </div>
        <div className="max-w-lg mx-auto   p-4 rounded-md ">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
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

                <div className="flex flex-col gap-4 md:grid md:grid-cols-[auto_35%] md:items-end">
                  <DateField label="Date" />

                  <InputField
                    label="Time"
                    type="time"
                    name="time"
                    placeholder="Enter Time"
                  />
                </div>
                <div className="flex justify-between gap-4 flex-col md:grid md:grid-cols-[auto_10%_auto] md:items-end">
                  <InputField
                    label="Option A"
                    name="OptionA"
                    placeholder="Enter Option A"
                  />

                  {!isMobile && (
                    <span
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      VS
                    </span>
                  )}

                  <InputField
                    label="Option B"
                    name="OptionB"
                    placeholder="Enter Option B`"
                  />
                </div>
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
