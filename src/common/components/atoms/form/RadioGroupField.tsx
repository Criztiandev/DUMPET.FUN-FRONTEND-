import { Controller, useFormContext } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/common/components/atoms/ui/radio-group";
import { Label } from "@/common/components/atoms/ui/label";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  name: string;
}

const RadioGroupField = ({ name, children }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Please select a deposit type" }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup onValueChange={field.onChange} value={field.value}>
            {children}
          </RadioGroup>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

interface RadioItemProps {
  value: string;
  label: string;
  name?: string;
}

export const RadioGroupItemField = ({
  value,
  label,
  name = "",
}: RadioItemProps) => {
  const { watch } = useFormContext();
  const fieldValue = watch(name);

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} checked={fieldValue === value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  );
};

export default RadioGroupField;
