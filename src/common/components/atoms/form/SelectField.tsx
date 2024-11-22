import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/common/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  description?: string;
  placeholder: string;
  options: SelectOption[];
  name: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  standalone?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      label,
      placeholder,
      options,
      description,
      name,
      className,
      disabled,
      required,
      standalone = false,
      defaultValue,
      onChange,
      error,
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !standalone;

    const selectContent = (
      value?: string,
      onChangeValue?: (value: string) => void
    ) => (
      <Select
        defaultValue={value}
        onValueChange={onChangeValue}
        disabled={disabled}
      >
        <FormControl>
          <SelectTrigger
            ref={ref}
            className={cn(
              "w-full",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        {options?.length > 0 && (
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer",
                  disabled && "cursor-not-allowed"
                )}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
    );

    if (!hasForm) {
      return (
        <div className="space-y-2">
          {label && (
            <label
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-red-500"
              )}
            >
              {label}
            </label>
          )}
          {selectContent(defaultValue, onChange)}
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
        render={({ field }: any) => (
          <FormItem>
            {label && (
              <FormLabel
                className={cn(
                  required &&
                    "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
              >
                {label}
              </FormLabel>
            )}
            {selectContent(field.value, field.onChange)}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
