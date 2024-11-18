import DateField from "@/common/components/atoms/form/DateField";
import DatePickerWithPreset from "@/common/components/atoms/form/DateField";
import FileInputField from "@/common/components/atoms/form/FileInputField";
import InputField from "@/common/components/atoms/form/InputField";
import { Button, buttonVariants } from "@/common/components/atoms/ui/button";
import { XStack } from "@/common/components/atoms/ui/stack";
import CreateMarketTopbar from "@/common/components/template/layout/create-market-topbar";
import { cn } from "@/common/lib/utils";
import useCreateMarket from "@/feature/market/hooks/market/use-create-market";
import { MarketFormValue } from "@/feature/market/interface/market.interface";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";

const CreateMarketCreen = () => {
  const { form, mutation } = useCreateMarket();
  const isMobile = useIsMobile();

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

    console.log(formData);

    // Add Duration field and submit
    // mutation.mutate({
    //   ...formData,
    //   Duration: unixDuration.toString(),
    // });
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
                <ImagePreview />

                <FileInputField
                  label="Thumbnai"
                  name="thumbnail"
                  placeholder="Select Images"
                  accept="image/*"
                />

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

const ImagePreview = () => {
  const { watch } = useFormContext<MarketFormValue>();
  const thumbnailFile = watch("thumbnail");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile as any);
      setPreviewUrl(url);

      // Cleanup
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [thumbnailFile]);

  return (
    <div className="h-[200px] w-full border rounded-md overflow-hidden">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Thumbnail preview"
          className="w-full h-full object-cover"
          onError={() => setPreviewUrl("")}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>No image selected</p>
        </div>
      )}
    </div>
  );
};
