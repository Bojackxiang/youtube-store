import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface InputFieldProps {
  form: UseFormReturn<
    {
      email: string;
      password: string;
      phone?: string;
    },
    any,
    undefined
  >;
  className?: string;
  fieldName: "email" | "password" | "phone";
  placeholder: string;
  label: string;
  loading: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  form,
  className,
  fieldName,
  placeholder,
  label,
  loading,
  type = "text",
}) => {
  return (
    <div className={cn(className)}>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                className="border-neutral-400 pl-2"
                disabled={loading}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputField;
