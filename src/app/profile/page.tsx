"use client"
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  Github,
  Instagram,
  Linkedin,
  LogInIcon,
  LogOutIcon,
  Mail,
  Settings,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();

  const isLoggedIn = !!session.data;

  return (
    isLoggedIn && (
      <div className="h-screen">
        <div className="p-20">
          <div className="flex justify-between mb-20">
            <Button
              onClick={() => router.back()}
              className="flex justify-between"
            >
              <ArrowBigLeft className="mr-5" /> Back
            </Button>
            <Button asChild className="w-[30%]">
              <Link href="/create-room">Create Room</Link>
            </Button>
          </div>
          <div>
            <div className="flex gap-16">
              <div>
                <Image
                  src={session.data?.user.image || ""}
                  width="150"
                  height="150"
                  alt="user image"
                  className="rounded-full"
                />
              </div>
              <div className="p-1 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl">Hey, {session.data?.user.name}</h1>
                  <h3 className="text-xl">Email: {session.data?.user.email}</h3>
                </div>
                <div className="flex gap-5">
                  <Button asChild variant="secondary">
                    <Link
                      href="https://myaccount.google.com"
                      className="flex items-center"
                    >
                      <Settings className="mr-2" /> Manage Account
                    </Link>
                  </Button>
                  <Button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    <LogOutIcon className="mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="border-t-2 dark:border-[#ffffff62] border-[#0000005c] fixed bottom-0 left-0 w-full">
          <div className="flex gap-3 px-10 py-2 justify-center items-center">
            <Link href="https://twitter.com/iamshadmirza" className="underline">
              <Github />
            </Link>
            <Link href="https://twitter.com/iamshadmirza" className="underline">
              <Linkedin />
            </Link>
            <Link href="https://twitter.com/iamshadmirza" className="underline">
              <Mail />
            </Link>
            <Link href="https://twitter.com/iamshadmirza" className="underline">
              <Instagram />
            </Link>
          </div>
        </footer>
      </div>
    )
  );
}
