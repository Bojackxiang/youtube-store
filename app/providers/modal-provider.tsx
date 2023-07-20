"use client";
import PreviewModal from "@/components/ui/preview-modal";
import { useEffect, useState } from "react";

// import StoreModal from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <PreviewModal/>
    </>
  );
};
