import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "./providers/toast-provider";
import { ModalProvider } from "./providers/modal-provider";
import Navbar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";
import AuthProvider from "./providers/auth-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={font.className}>
        <AuthProvider>
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
