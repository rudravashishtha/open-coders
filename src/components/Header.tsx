"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  const session = useSession();
  return (
    <header>
      <div className="flex justify-between items-center p-10 ">
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}

        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
