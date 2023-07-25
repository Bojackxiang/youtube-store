"use client";

import * as z from "zod";
import { useState } from "react";

import Modal from "@/components/helpers/modal";
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
        <div className="flex justify-around p-6">
          <div className="flex-1">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-400 pl-2"
                        disabled={loading}
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border-neutral-400 pl-2"
                        disabled={loading}
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phone</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-400 pl-2"
                        disabled={loading}
                        placeholder="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <Button className="w-full text-neutral-100 font-bold bg-gradient-to-r to-blue-500 from-cyan-500">
                Sign up
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center mx-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
            <AuthSideInfo />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
