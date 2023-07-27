"use client";

import * as z from "zod";
import { useState } from "react";

import Modal from "@/components/helpers/modal";
import useLoginModal from "@/hooks/use-auth-modal";
import SignUpForm from "./components/signn-up-form";
import LoginForm from "./components/login-form";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
});

type Variant = "LOGIN" | "REGISTER";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  return (
    <Modal open={loginModal.isOpen} onClose={loginModal.onClose}>
      <div className="w-full">
        {variant === "LOGIN" ? (
          <LoginForm toggleVariant={toggleVariant} />
        ) : (
          <SignUpForm toggleVariant={toggleVariant} />
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
