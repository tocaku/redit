"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <button
      className="flex gap-4 ml-1"
      type="button"
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
    >
      <LogOut size={18} />
      <span className="text-[0.875rem]">Log Out</span>
    </button>
  );
};

export default SignOut;
