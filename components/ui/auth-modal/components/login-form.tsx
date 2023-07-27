"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import useLoginModal from "@/hooks/use-auth-modal";
import { Form } from "@/shadcn-components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shadcn-components/ui/button";
import AuthSideInfo from "../components/AuthSideInfo";
import AuthTitle from "./AuthTitle";
import InputField from "./InputField";
import { toast } from "react-hot-toast";
import { userRegisterRequest } from "@/actions/user-register-request";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;
type Variant = "LOGIN" | "REGISTER";

interface LoginFormProps {
  toggleVariant: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleVariant }) => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginModal();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);

      // const response = await userRegisterRequest(data);
      // if (response) {
      //   if (!response.success) {
      //     toast.error(response.message);
      //   } else {
      //     toast.success("User has been registered successfully");
      //     await new Promise((resolve) => setTimeout(resolve, 2000));
      //     loginModal.onClose();
      //     router.push("/sign-up-success");
      //   }
      // }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTitle>Log in</AuthTitle>
        <div className="flex flex-col sm:flex-row-reverse justify-around p-5">
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
            <div className="mt-4">
              <Button className="w-full text-neutral-100 font-bold bg-gradient-to-r to-blue-500 from-cyan-500">
                Sign up
              </Button>
              <Button
                className="block text-center mx-auto text-blue-600"
                onClick={toggleVariant}
              >
                Don't have an account? Sign up
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

export default LoginForm;
