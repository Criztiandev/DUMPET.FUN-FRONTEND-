import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/atoms/ui/button";
import { Calendar } from "@/common/components/atoms/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/atoms/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";
import { Label } from "../ui/label";

// Memoize time options generation
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "30"]) {
      const period = hour >= 12 ? "PM" : "AM";
      let displayHour = hour % 12;
      if (displayHour === 0) displayHour = 12;

      const time = `${displayHour}:${minute} ${period}`;
      const value = `${hour.toString().padStart(2, "0")}:${minute}`;

      times.push({ label: time, value });
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

interface Props {
  label?: string;
}

const DatePickerWithPreset = (props: Props) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedTime = watch("time");

  const formatDateTime = React.useCallback(
    (date: Date | undefined, time: string | undefined) => {
      if (!date) return "Pick a date";

      const dateStr = format(date, "MMMM d, yyyy");
      if (!time) return dateStr;

      const timeObj = timeOptions.find((t) => t.value === time);
      return `${dateStr} (${timeObj?.label || ""})`;
    },
    []
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col gap-3">
        {props.label && <Label>{props.label}</Label>}
        <div className="flex flex-col gap-1.5">
          <Controller
            name="date"
            control={control}
            rules={{
              required: "Date is required",
            }}
            render={({ field: { value, onChange } }) => (
              <>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "justify-start text-left font-normal w-full bg-primary/50 dark:bg-primary/20",
                      !value && "text-muted-foreground",
                      errors.date && "border-red-500"
                    )}
                  >
                    <span className="gap-2 flex items-center">
                      <CalendarIcon size={18} />
                      {formatDateTime(value, selectedTime)}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Controller
                    name="time"
                    control={control}
                    rules={{
                      required: "Time is required",
                    }}
                    render={({
                      field: { value: timeValue, onChange: onTimeChange },
                    }) => (
                      <Select value={timeValue} onValueChange={onTimeChange}>
                        <SelectTrigger
                          className={cn(errors.time && "border-red-500")}
                        >
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="max-h-[300px]"
                        >
                          {timeOptions.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={(date) => {
                        onChange(date);
                        if (date && selectedTime) setIsOpen(false);
                      }}
                    />
                  </div>
                </PopoverContent>
              </>
            )}
          />
          {errors.date && (
            <span className="text-sm text-red-500">
              {errors.date.message as string}
            </span>
          )}
          {errors.time && (
            <span className="text-sm text-red-500">
              {errors.time.message as string}
            </span>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default DatePickerWithPreset;
