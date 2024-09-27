"use client";

import { Input } from "@/components/ui/Input";
import React, { FC } from "react";
import { Button } from "./ui/Button";
import useCreateSubreddit from "@/hooks/use-create-subreddit";

const CreateCommunity: FC = () => {
  const { input, mutate, setInput } = useCreateSubreddit();
  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-center border-zinc-700 border rounded-lg px-3">
        <p className="text-zinc-400">r/</p>
        <Input
          className="bg-transparent outline-none border-none focus-visible:outline-none focus-visible:ring-0 
       focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pl-1"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row-reverse gap-3 bg-[#343536] py-4 px-2 mt-3 rounded-md">
        <Button
          className="bg-zinc-200 text-black hover:bg-white/60 transition-all rounded-3xl font-bold"
          onClick={() => mutate()}
        >
          Create Community
        </Button>
        <Button className="bg-transparent text-zinc-200 p-5 hover:bg-transparent/10 transition-all border  rounded-3xl font-bold">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateCommunity;
