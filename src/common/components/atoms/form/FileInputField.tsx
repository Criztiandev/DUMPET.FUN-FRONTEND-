import { Input } from "../ui/input";
import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { cn } from "@/common/lib/utils";
import { Button } from "../ui/button";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  description?: string;
  dir?: "left" | "right";
  icon?: ReactNode;
  onPress?: () => void;
  name: string;
}

const FileInputField: FC<Props> = ({ label, description, name, ...props }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              ref={divRef}
              tabIndex={-1}
              className={cn(
                "rounded-base flex items-center rounded-md border dark:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                props.className
              )}
            >
              {props.dir === "left" && props.icon && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-[48px]"
                  onClick={props.onPress}
                >
                  {props.icon}
                </Button>
              )}

              <Input
                type="file"
                {...props}
                {...field}
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  onChange(file);
                }}
                className={cn("border-none bg-primary/50 dark:bg-primary/20")}
              />

              {props.dir === "right" && props.icon && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-[48px]"
                  onClick={props.onPress}
                >
                  {props.icon}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInputField;
