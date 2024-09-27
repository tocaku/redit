"use client";

import React, { FC, useContext, useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Subscription } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { InputContext } from "../context/Input";
import { useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
interface SearchSubredditProp {
  subscription: (Subscription & {
    subreddit: {
      id: string;
      name: string;
      subscribers: Subscription[];
    };
  })[];
}
const SearchSubreddit: FC<SearchSubredditProp> = ({ subscription }) => {
  const { data } = useSession();
  const { subreddit, setSubreddit } = useContext(InputContext);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const pathname = usePathname();
  // const [input, setInput] = useState("");
  const router = useRouter();
  // useEffect(() => {
  //   if (pathname.startsWith("/r")) setInput(pathname.split("/")[2]);
  // }, [pathname]);
  return (
    // ((pathname.startsWith("/r") && pathname.endsWith("/submit")) ||
    //   pathname.startsWith("/submit")) && (
    <div className="flex flex-col w-64 mb-3">
      <h4 className="mb-5">Create a post</h4>
      <hr className="border-zinc-700" />
      <div className="flex items-center bg-zinc-900 px-2 mt-5 rounded-tr-md rounded-tl-md">
        <Search />
        <Input
          placeholder="Search communities"
          className="bg-transparent placeholder:text-zinc-400 focus-visible:border-0 focus-visible:ring-0  focus-visible:ring-offset-0 ring-offset-0 border-0"
          onClick={() => setDropDownOpen((prev) => !prev)}
          onChange={(e) => setSubreddit(e.target.value)}
          value={subreddit ?? pathname.split("/")[2]}
        />
        <ChevronDown size={22} className="text-zinc-400" />
      </div>
      {dropDownOpen && (
        <div
          className="w-64 max-h-52 overflow-y-scroll bg-zinc-900 border-t-[1.5px] border-t-zinc-700 rounded-bl-md rounded-br-md"
          id="dropdown"
        >
          <div className="px-2 py-1">
            <span className="text-zinc-500 text-xs font-bold">
              Your profile
            </span>
            <div className="flex items-center gap-2 mt-1">
              <UserAvatar
                profileImage={data.user.image}
                width="w-7"
              ></UserAvatar>
              <span className="text-sm">u/{data.user.username}</span>
            </div>
          </div>
          <hr className="my-3 border-zinc-700" />

          <div className="px-2 py-1">
            <div className="flex justify-between items-center mb-3">
              <span className="text-zinc-500 text-xs font-bold">
                Your community
              </span>
              <CreateCommunityDialog>
                <span className="text-xs font-bold text-zinc-300">
                  Create new
                </span>
              </CreateCommunityDialog>
            </div>
            <ul className="flex flex-col items-start gap-y-3">
              {subscription?.map(({ subreddit }) => (
                <li
                  key={subreddit.id}
                  onClick={() => {
                    setSubreddit(subreddit.name);
                    router.push(`r/${subreddit.name}/submit`);
                  }}
                  className="cursor-pointer text-sm font-semibold flex flex-col justify-center text-zinc-300 w-full hover:bg-zinc-900"
                >
                  {`r/${subreddit.name}`}
                  <span className="text-zinc-500 text-[12px] font-bold">
                    {subreddit.subscribers.length} members
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSubreddit;
