"use client";

import { FC } from "react";
import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { ImageIcon, Link2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/Button";

interface CreatePostProp {
  user: Pick<User, "image">;
}
const CreatePostMock: FC<CreatePostProp> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-[#1A1A1B] p-3 w-full flex">
      <UserAvatar profileImage={user?.image} />
      <Input
        onClick={() => router.push(`${pathname}/submit`)}
        className="mx-4 bg-zinc-800 border-none"
        placeholder="Create Post"
      ></Input>
      <Button
        onClick={() => router.push(`${pathname}/submit`)}
        variant="ghost"
        className="hover:bg-zinc-800 px-2"
      >
        <ImageIcon className="text-zinc-600" />
      </Button>
      <Button
        onClick={() => router.push(`${pathname}/submit`)}
        variant="ghost"
        className="hover:bg-zinc-800 px-2"
      >
        <Link2 className="text-zinc-600" />
      </Button>
    </div>
  );
};

export default CreatePostMock;
