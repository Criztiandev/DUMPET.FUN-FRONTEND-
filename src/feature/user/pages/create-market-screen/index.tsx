import React from "react";
import DateField from "@/common/components/atoms/form/DateField";
import InputField from "@/common/components/atoms/form/InputField";
import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import CreateMarketTopbar from "@/common/components/template/layout/create-market-topbar";
import { cn } from "@/common/lib/utils";
import useCreateMarket from "@/feature/market/hooks/market/use-create-market";
import { MarketFormValue } from "@/feature/market/interface/market.interface";
import { useIsMobile } from "@/hooks/use-mobile";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { Alert, AlertDescription } from "@/common/components/atoms/ui/alert";
import Topbar from "@/common/components/template/layout/topbar";
import { useAccountStore } from "../../store/account-store";

import SelectField from "@/common/components/atoms/form/SelectField";

const CreateMarketScreen = () => {
  const { form, mutation } = useCreateMarket();
  const isMobile = useIsMobile();
  const { isOnline } = useAccountStore();
  const [dateError, setDateError] = React.useState<string>("");

  const validateDateTime = (date: Date, time: string): boolean => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const selectedDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);

    // Check if the selected date/time is in the past
    if (selectedDate.getTime() <= now.getTime()) {
      setDateError("Please select a future date and time");
      return false;
    }

    setDateError("");
    return true;
  };

  const onSubmit = (data: MarketFormValue) => {
    const selectedDate = new Date(data.date);
    const [hours, minutes] = data.time.split(":").map(Number);

    if (!validateDateTime(selectedDate, data.time)) {
      return;
    }

    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);

    // Convert to milliseconds
    const unixTimestamp = selectedDate.getTime();

    const { date: _, time: __, ...formData } = data;

    mutation.mutate({
      ...formData,
      Duration: unixTimestamp.toString(),
    } as any);
  };

  return (
    <div className="w-full min-h-screen">
      {isOnline ? <CreateMarketTopbar /> : <Topbar />}

      <div className="flex justify-center items-center flex-col pt-24 h-full">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold my-4">Create Market</h1>
        </div>
        <div className="max-w-lg mx-auto p-4 rounded-md w-full ">
          {dateError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{dateError}</AlertDescription>
            </Alert>
          )}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="space-y-4">
                <SyncedFields />
                <InputField
                  label="Title"
                  name="Title"
                  placeholder="Enter title"
                />

                <div className="flex flex-col gap-4 md:grid md:grid-cols-[auto_35%] md:items-end">
                  <DateField label="Date" name="date" />

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
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          className: "hover:bg-transparent cursor-default",
                        })
                      )}
                    >
                      VS
                    </span>
                  )}

                  <InputField
                    label="Option B"
                    name="OptionB"
                    placeholder="Enter Option B"
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

export default CreateMarketScreen;

const SyncedFields = () => {
  const { control, setValue } = useFormContext();

  // Watch both fields
  const tokenTxId = useWatch({
    control,
    name: "TokenTxId",
  });

  const tokenTxId1 = useWatch({
    control,
    name: "selectToken",
  });

  // Update TokenTxId1 when TokenTxId changes
  React.useEffect(() => {
    if (tokenTxId && tokenTxId !== tokenTxId1) {
      setValue("selectToken", tokenTxId);
    }
  }, [tokenTxId, setValue]);

  // Update TokenTxId when TokenTxId1 changes
  React.useEffect(() => {
    if (tokenTxId1 && tokenTxId1 !== tokenTxId) {
      setValue("TokenTxId", tokenTxId1);
    }
  }, [tokenTxId1, setValue]);

  return (
    <div className="grid grid-cols-[auto_20%] items-end gap-4">
      <InputField
        label="TokenTxId"
        name="TokenTxId"
        placeholder="Enter TokenTxId"
      />
      <SelectField
        name="selectToken"
        placeholder="Token"
        options={[
          {
            value: "QD3R6Qes15eQqIN_TK5s7ttawzAiX8ucYI2AUXnuS18",
            label: "DUMPET",
          },
          {
            value: "xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10",
            label: "wAR",
          },
          {
            value: "NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8",
            label: "qAR",
          },
          {
            value: "7zH9dlMNoxprab9loshv3Y7WG45DOny_Vrq9KrXObdQ",
            label: "wUSDC",
          },
          {
            value: "agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA",
            label: "tIO",
          },
          {
            value: "wOrb8b_V8QixWyXZub48Ki5B6OIDyf_p1ngoonsaRpQ",
            label: "TRUNK",
          },
          {
            value: "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc",
            label: "0RBT",
          },
          {
            value: "DM3FoZUq_yebASPhgd8pEIRIzDW6muXEhxz5-JwbZwo",
            label: "PIXL",
          },
          {
            value: "pazXumQI-HPH7iFGfTC-4_7biSnqz_U67oFAGry5zUY",
            label: "LLAMA",
          },
          {
            value: "8rbAftv7RaPxFjFk5FGUVAVCSjGQB4JHDcb9P9wCVhQ",
            label: "AGENT",
          },
        ]}
      />
    </div>
  );
};
