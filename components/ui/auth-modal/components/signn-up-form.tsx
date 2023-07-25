"use client";

import * as z from "zod";
import { useState } from "react";

import useLoginModal from "@/hooks/use-auth-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shadcn-components/ui/input";
import { Button } from "@/shadcn-components/ui/button";
import AuthSideInfo from "../components/AuthSideInfo";
import AuthTitle from "./AuthTitle";
import InputField from "./InputField";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;
type Variant = "LOGIN" | "REGISTER";

const SignUpForm = () => {
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTitle>Sign Up</AuthTitle>
        <div className="flex flex-col sm:flex-row justify-around p-5">
          <div className="flex-1">
            <InputField
              form={form}
              fieldName="email"
              placeholder="email"
              label="email"
              loading={loading}
            />
            <InputField
              className="mt-4"
              form={form}
              fieldName="password"
              placeholder="password"
              label="password"
              type="password"
              loading={loading}
            />
            <InputField
              className="mt-4"
              form={form}
              fieldName="phone"
              placeholder="phone"
              label="phone"
              loading={loading}
            />

            <div className="mt-4">
              <Button className="w-full text-neutral-100 font-bold bg-gradient-to-r to-blue-500 from-cyan-500">
                Sign up
              </Button>
            </div>
          </div>
          <div className="mt-6 p-6 sm:p-0 sm:mt-0 flex-1 flex justify-center items-center sm:mx-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
            <AuthSideInfo />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
