"use client";
import React from "react";
import Image from "next/image";

interface SignUpSuccessProps {}

const SignUpSuccess = ({}: SignUpSuccessProps) => {
  return (
    <section className="flex justify-center items-center h-screen">
      <main className="text-center">
        <div className="font-bold text-3xl">Sign Up Successfully! Welcome!</div>
        <div className="text-xl">Please check your email for the confirmation link!</div>
        <div className="text-center">
          <Image src={"/images/welcome-logo.jpg"} alt="welcome-logo" height={200} width={500}/>
        </div>
      </main>
    </section>
  );
};

export default SignUpSuccess;
