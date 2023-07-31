"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User2Icon, InfoIcon, LogOutIcon, Home } from "lucide-react";
import { cn } from "@/libs/tw";
import { Button } from "@/shadcn-components/ui/button";
import useLoginModal from "@/hooks/use-auth-modal";
import { useSession, signOut } from "next-auth/react";

interface UserNameDropdownMenuProps {
  className?: string;
}

const UserNameDropdownMenu: React.FC<UserNameDropdownMenuProps> = ({
  className,
}) => {
  const loginModal = useLoginModal();
  const { status, data} = useSession();
  console.log('data: ', data);

  const logout = () => {
    signOut({  redirect: false, callbackUrl: "/" });
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className={cn(className)}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="outline-none" aria-label="options">
                <User2Icon />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="user-dropdown-menu">
                <DropdownMenu.Item className="user-dropdown-menu-item">
                  <InfoIcon size={15} className="mr-2" /> My Orders
                </DropdownMenu.Item>
                <DropdownMenu.Item className="user-dropdown-menu-item">
                  <Home size={15} className="mr-2" /> Address Management
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="user-dropdown-menu-divider" />
                <DropdownMenu.Item
                  className="user-dropdown-menu-item user-dropdown-menu-item-warning"
                  onClick={logout}
                >
                  <LogOutIcon size={15} className="mr-2" /> Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      ) : (
        <Button onClick={loginModal.onOpen}>Login / Sign in</Button>
      )}
    </>
  );
};

export default UserNameDropdownMenu;
