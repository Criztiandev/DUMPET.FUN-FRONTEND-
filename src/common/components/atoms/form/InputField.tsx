import { Input } from "@/common/components/atoms/ui/input";
import { Button } from "@/common/components/atoms/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { cn } from "@/common/lib/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  iconPosition?: "left" | "right";
  icon?: ReactNode;
  onIconClick?: () => void;
  name: string;
  standalone?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      description,
      iconPosition,
      icon,
      onIconClick,
      name,
      standalone = false,
      className,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !standalone;

    const inputWrapper = (
      <div
        className={cn(
          "flex items-center rounded-md border bg-background",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {iconPosition === "left" && icon && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onIconClick}
            tabIndex={-1}
          >
            {icon}
          </Button>
        )}

        <Input
          ref={ref}
          name={name}
          className={cn(
            "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary/10",
            icon && iconPosition === "left" && "pl-0",
            icon && iconPosition === "right" && "pr-0"
          )}
          {...props}
        />

        {iconPosition === "right" && icon && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onIconClick}
            tabIndex={-1}
          >
            {icon}
          </Button>
        )}
      </div>
    );

    if (!hasForm) {
      return (
        <div className="space-y-2">
          {label && <label className="text-sm font-medium">{label}</label>}
          {inputWrapper}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      );
    }

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...field}
                value={field.value || ""} // Handle undefined/null values
                ref={ref}
                {...props}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
