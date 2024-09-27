import Image from "next/image";
import React from "react";

const PostingRule = () => {
  return (
    <div className="bg-primary p-4 rounded-md text-zinc-300">
      <div className="flex gap-2 mb-3">
        <Image src="/assets/sticker.webp" alt="" width={40} height={40} />
        <h1 className="text-sm mt-4 font-semibold">Posting to Reddit</h1>
      </div>
      <hr className="border-zinc-700" />
      <ol className="list-decimal list-inside font-semibold">
        <li className="my-2 text-[13px]">Remember the human</li>
        <hr className="border-zinc-700" />
        <li className="my-2 text-[13px]">Behave like you would in real life</li>
        <hr className="border-zinc-700" />
        <li className="my-2 text-[13px]">
          Look for the original source of content
        </li>
        <hr className="border-zinc-700" />
        <li className="my-2 text-[13px]">
          Search for duplicates before posting
        </li>
        <hr className="border-zinc-700" />
        <li className="my-2 text-[13px]">Read the community’s rules</li>
        <hr className="border-zinc-700" />
      </ol>
    </div>
  );
};

export default PostingRule;
