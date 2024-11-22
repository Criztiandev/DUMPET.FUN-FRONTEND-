import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/atoms/ui/button";
import { Calendar } from "@/common/components/atoms/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/atoms/ui/popover";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/atoms/ui/form";

interface DateFieldProps {
  name: string;
  label?: string;
  description?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  standalone?: boolean;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  validateTime?: boolean;
  timeFieldName?: string;
}

const DateField = React.forwardRef<HTMLButtonElement, DateFieldProps>(
  (
    {
      name,
      label,
      description,
      minDate,
      maxDate,
      placeholder = "Pick a date",
      className,
      disabled,
      required,
      standalone = false,
      defaultValue,
      onChange,
      error,
      validateTime = false,
      timeFieldName = "time",
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !standalone;
    const [isOpen, setIsOpen] = React.useState(false);

    // Get tomorrow's date at midnight
    const tomorrow = React.useMemo(() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }, []);

    const formatDateTime = React.useCallback(
      (date: Date | undefined) => {
        if (!date) return placeholder;
        return format(date, "MMMM d, yyyy");
      },
      [placeholder]
    );

    const validateDate = React.useCallback(
      (date: Date | undefined) => {
        if (!date) return required ? "Date is required" : true;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (minDate && date < minDate) {
          return `Please select a date after ${format(
            minDate,
            "MMMM d, yyyy"
          )}`;
        }

        if (maxDate && date > maxDate) {
          return `Please select a date before ${format(
            maxDate,
            "MMMM d, yyyy"
          )}`;
        }

        if (date < now) {
          return "Please select a future date";
        }

        if (validateTime && hasForm) {
          const timeValue = form.getValues(timeFieldName);
          if (timeValue) {
            const [hours, minutes] = timeValue.split(":").map(Number);
            const selectedDateTime = new Date(date);
            selectedDateTime.setHours(hours, minutes, 0, 0);

            if (selectedDateTime <= new Date()) {
              return "Selected date and time must be in the future";
            }
          }
        }

        return true;
      },
      [minDate, maxDate, required, validateTime, hasForm, form, timeFieldName]
    );

    const isDateDisabled = React.useCallback(
      (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) return true;
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;

        return false;
      },
      [minDate, maxDate]
    );

    const datePickerContent = (
      value: Date | undefined,
      onChangeValue: (date: Date | undefined) => void,
      hasError?: boolean
    ) => (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal bg-primary/10 border",
              !value && "text-muted-foreground",
              hasError && "border-destructive",
              disabled && "opacity-50 cursor-not-allowed bg-primary/10",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateTime(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChangeValue(date);
              setIsOpen(false);
            }}
            disabled={isDateDisabled}
            defaultMonth={value || tomorrow}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );

    if (!hasForm) {
      return (
        <div className="space-y-2">
          {label && (
            <div
              className={cn(
                "text-sm font-medium leading-none",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-destructive"
              )}
            >
              {label}
            </div>
          )}
          {datePickerContent(defaultValue, onChange || (() => {}), !!error)}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
        </div>
      );
    }

    return (
      <FormField
        control={form.control}
        name={name}
        rules={{
          required: required ? "Date is required" : false,
          validate: validateDate,
        }}
        render={({ field, fieldState }: any) => (
          <FormItem className="flex flex-col">
            {label && (
              <FormLabel
                className={cn(
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-destructive"
                )}
              >
                {label}
              </FormLabel>
            )}
            {datePickerContent(field.value, field.onChange, !!fieldState.error)}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

DateField.displayName = "DateField";

export default DateField;
