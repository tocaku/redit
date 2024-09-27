import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/Dropdown-menu";
import React from "react";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { Plus, Eye } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { Switch } from "@/components/ui/Switch";
import Link from "next/link";
import SignOut from "./SignOut";

interface UserAccountProp {
  user: Pick<User, "image" | "username">;
}

const UserAccount: React.FC<UserAccountProp> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar profileImage={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#232324] text-white p-5 border-[#3c3c3d]">
        <div className="flex items-center gap-2">
          <FaRegUserCircle size={19} className="text-gray-400/60" />
          <DropdownMenuLabel className="text-gray-400 font-light">
            My Stuff
          </DropdownMenuLabel>
        </div>
        <div className="px-7 my-4 flex flex-col gap-3">
          <div className="flex items-center">
            <DropdownMenuItem>Online status</DropdownMenuItem>
            <Switch />
          </div>
          <DropdownMenuItem>
            <Link href={`/user/${user.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">User Settings</Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />
        <div className="flex items-center gap-2 ">
          <Eye className="text-gray-400/60" size={20} />
          <DropdownMenuLabel className="text-gray-400 font-light">
            View Options
          </DropdownMenuLabel>
        </div>
        <div className="flex px-7 my-4 items-center">
          <DropdownMenuItem>Dark Mode</DropdownMenuItem>
          <Switch />
        </div>
        <DropdownMenuSeparator />

        <div className="flex my-5 flex-col gap-3">
          <div className="flex gap-2">
            <Plus size={19} />
            <CreateCommunityDialog>
              <p>Create Community</p>
            </CreateCommunityDialog>
          </div>
          <SignOut />
        </div>
        <p className="text-gray-500 text-xs">
          Reddit, Inc. © 2024. All rights reserved.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
