"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import useLoginModal from "@/hooks/use-auth-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shadcn-components/ui/button";
import AuthSideInfo from "../components/AuthSideInfo";
import AuthTitle from "./AuthTitle";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/shadcn-components/ui/input";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;
const URL = `http://localhost:3001/api/register`;
interface SignUpFormProps {
  toggleVariant: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleVariant }) => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginModal();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);

      const response = await axios.post(URL, data);
      const { data: payload } = response;

      if (!payload.success) {
        throw new Error(payload.message);
      } else {
        toast.success("User has been registered successfully");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        loginModal.onClose();
        router.push("/sign-up-success");
      }
    } catch (error: any) {
      const message = error.response.data.error;
      if (message) {
        toast.error(`Sorry, ${message}`);
      } else {
        toast.error(`Sorry, something wrong, try again later`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTitle>Sign Up</AuthTitle>
        <div className="flex flex-col sm:flex-row justify-around p-5">
          <div className="flex-1">
            {/* Email */}
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-400 pl-2"
                      disabled={loading}
                      placeholder={"Enter the email"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border-neutral-400 pl-2"
                      disabled={loading}
                      placeholder={"Enter the email"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name */}
            <FormField
              control={form.control}
              name={"firstName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      // type={type}
                      className="border-neutral-400 pl-2"
                      disabled={loading}
                      placeholder={"First name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name={"lastName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-400 pl-2"
                      disabled={loading}
                      placeholder={"LastName Name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name={"phone"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="border-neutral-400 pl-2"
                      disabled={loading}
                      placeholder={"phone"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <Button className="w-full text-neutral-100 font-bold bg-gradient-to-r to-blue-500 from-cyan-500">
                Sign up
              </Button>
            </div>
            <Button
              className="block text-center mx-auto text-blue-600"
              onClick={toggleVariant}
            >
              Already have an account? Login
            </Button>
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
