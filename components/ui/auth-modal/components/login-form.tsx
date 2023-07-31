"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { Form } from "@/shadcn-components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shadcn-components/ui/button";
import AuthSideInfo from "../components/AuthSideInfo";
import AuthTitle from "./AuthTitle";
import InputField from "./InputField";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/use-auth-modal";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  toggleVariant: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleVariant }) => {
  const authModal = useAuthModal();
  const [loading, setLoading] = useState(false);
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
      await signIn("credentials", { redirect: false, ...data })
        .then((response) => {
          if (response?.error) {
            throw new Error(response.error);
          } else {
            toast.success("Login success");
            authModal.onClose();
            router.push("/");
          }
        })
        .catch((e) => {
          toast.error(`Something wrong: ${e.message} `);
          setLoading(false);
        });
    } catch (error: any) {
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
              <Button
                type="submit"
                className="w-full text-neutral-100 font-bold bg-gradient-to-r to-blue-500 from-cyan-500"
              >
                Login
              </Button>
            </div>
          </div>
          <div className="mt-6 p-6 sm:p-0 sm:mt-0 flex-1 flex justify-center items-center sm:mx-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
            <AuthSideInfo />
          </div>
        </div>
      </form>
      <Button
        className="block text-center mx-auto text-blue-600"
        onClick={toggleVariant}
      >
        Don't have an account? Sign up
      </Button>
    </Form>
  );
};

export default LoginForm;
