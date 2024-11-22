import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
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
  rules?: Record<string, any>;
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
      rules,
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !standalone;

    const selectContent = (
      value: string | undefined,
      onChangeValue: (value: string) => void,
      hasError?: boolean
    ) => (
      <Select
        defaultValue={value}
        value={value}
        onValueChange={onChangeValue}
        disabled={disabled}
      >
        <FormControl>
          <SelectTrigger
            ref={ref}
            className={cn(
              "w-full",
              disabled && "opacity-50 cursor-not-allowed",
              hasError && "border-destructive",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options?.length > 0 ? (
            options.map((option) => (
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
            ))
          ) : (
            <SelectItem value="no-options" disabled>
              No options available
            </SelectItem>
          )}
        </SelectContent>
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
                  "after:content-['*'] after:ml-0.5 after:text-destructive"
              )}
            >
              {label}
            </label>
          )}
          {selectContent(defaultValue, onChange || (() => {}), !!error)}
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
      <Controller
        name={name}
        control={form.control}
        rules={{
          required: required ? "This field is required" : false,
          ...rules,
        }}
        defaultValue={defaultValue || ""}
        render={({ field, fieldState }) => (
          <FormItem>
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
            {selectContent(
              field.value,
              (value) => {
                field.onChange(value);
                onChange?.(value);
              },
              !!fieldState.error
            )}
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
