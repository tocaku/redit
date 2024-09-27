import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { LogOut } from "lucide-react";
import Auth from "./Auth";

const AuthDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-slate-800 p-3 rounded-full transition-all">
        {" "}
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 mt-3 bg-[#131F23] border-none text-white">
        <DropdownMenuLabel className="flex gap-5 border-none">
          <LogOut />
          <Auth>
            <p>Log In / Sign Up</p>
          </Auth>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDialog;
