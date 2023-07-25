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
import AuthSideInfo from "./components/AuthSideInfo";
import SignUpForm from "./components/signn-up-form";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;
type Variant = "LOGIN" | "REGISTER";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [variant, setVariant] = useState<Variant>("LOGIN");

  return (
    <Modal open={loginModal.isOpen} onClose={loginModal.onClose}>
      <div className="w-full">
        <SignUpForm />
      </div>
    </Modal>
  );
};

export default LoginModal;
