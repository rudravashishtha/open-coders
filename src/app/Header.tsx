"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogInIcon,
  LogOutIcon,
  Settings,
  UserRound,
  UserRoundX,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage
                src={
                  session.data?.user?.image ??
                  "https://source.unsplash.com/random/200x200"
                }
              />
              <AvatarFallback>
                {session.data?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {session.data?.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/browse" className="flex items-center">
              <UserRound className="mr-2" /> Browse
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/your-rooms" className="flex items-center">
              <UserRound className="mr-2" /> Your Rooms
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center">
              <UserRound className="mr-2" /> Your Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <UserRoundX className="mr-2" /> Delete Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-[1rem] hover:underline hover:text-[#111827]"
        >
          <div className="flex gap-0 border-solid border-black dark:border-white border-2 p-1">
            <span className="p-2 bg-black text-white dark:text-black dark:bg-white">
              OPEN
            </span>
            <span className="p-2 text-black  dark:text-white">CODERS</span>
          </div>
        </Link>

        <nav className="flex gap-8 items-center justify-center">
          {isLoggedIn && (
            <>
              <Link
                className="hidden md:block md:hover:underline"
                href="/browse"
              >
                Browse
              </Link>

              <Link
                className="hidden md:block md:hover:underline"
                href="/your-rooms"
              >
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
