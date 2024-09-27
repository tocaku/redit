import React from "react";

import AuthDialog from "./AuthDialog";
import Link from "next/link";
import { ArrowUpRightFromCircle, Plus, MessageCircle } from "lucide-react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Auth from "./Auth";
import { getAuthSession } from "@/lib/auth";
import UserAccount from "./UserAccount";

const NavLink = async () => {
  const session = await getAuthSession();
  return (
    <div className="flex items-center justify-end gap-6">
      <Link href="/r/popular">
        <ArrowUpRightFromCircle />
      </Link>

      {session?.user ? (
        <>
          <Link href="/r/popular">
            <MessageCircle />
          </Link>
          <Link href="/submit">
            <Plus />
          </Link>
          <UserAccount user={session.user} />
        </>
      ) : (
        <>
          <Auth>
            <p className="bg-[#ff5314d4] hover:bg-[#ff5314d4]/60 rounded-3xl px-4 py-2">
              Log In
            </p>
          </Auth>
          <AuthDialog>
            <HiOutlineDotsHorizontal size={20} />
          </AuthDialog>
        </>
      )}
    </div>
  );
};

export default NavLink;
