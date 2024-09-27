"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

interface UserAvatarProp {
  profileImage: string | undefined;
  width?: string;
}
const UserAvatar: React.FC<UserAvatarProp> = ({ profileImage, width }) => {
  return (
    <Avatar>
      <AvatarImage
        src={profileImage}
        className={`${width || "w-9"} rounded-full`}
      />
      <AvatarFallback>
        <Image
          src="https://github.com/shadcn.png"
          alt="user fallback image"
          width={35}
          height={35}
          className="rounded-full"
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
