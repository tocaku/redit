import SubUnsubToggle from "@/components/SubUnsubToggle";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import React from "react";
import { LuCakeSlice } from "react-icons/lu";
import { Users } from "lucide-react";

const layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      subscribers: true,
    },
  });
  if (!subreddit) {
    return notFound();
  }
  const member = subreddit.subscribers.length;
  let isSubscribed = false;

  if (session?.user && subreddit.id !== session?.user.id) {
    const subscription = await db.subscription.findFirst({
      where: {
        subredditId: subreddit.id,
        userId: session?.user.id,
      },
    });
    isSubscribed = !!subscription;
  }

  return (
    <div className="sm:container max-w-7xl h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="col-span-2">{children}</div>
        {/* sidebar */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last bg-[#1A1A1B] text-zinc-200">
          <div className="px-6 py-4">
            <p className="font-semibold py-3">About r/{subreddit.name}</p>
          </div>
          <dl className="divide-y divide-gray-500 px-6 py-4 text-sm leading-6 text-zinc-200">
            <div>
              <p className="mt-6">Post sensibly please</p>
              <div className="flex justify-start items-center gap-4 py-3">
                <div className="flex items-center gap-3">
                  <LuCakeSlice size={20} />
                  <dt className="text-zinc-400/80">Created</dt>
                </div>
                <dd className="text-zinc-400/80">
                  <time dateTime={subreddit.createdAt.toDateString()}>
                    {format(subreddit.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>
            </div>
            <div className="flex justify-between gap-x-4 py-3 text-zinc-200">
              <div className="flex items-center gap-3">
                <Users />
                <dt>Hommies</dt>
              </div>
              <dd className="flex items-start gap-x-2">
                <div>{member}</div>
              </dd>
            </div>
            {/* Display creation info if the current user is the creator of the subreddit */}
            {subreddit.creatorId === session?.user?.id ? (
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">You created this community</dt>
              </div>
            ) : null}
            {/* Display subscription toggle if the current user is not the creator of the subreddit */}
            {subreddit.creatorId !== session?.user?.id ? (
              <SubUnsubToggle
                isSubscribed={isSubscribed}
                subredditId={subreddit.id}
                subredditName={subreddit.name}
              />
            ) : null}
            {/* Link to create a new post in the subreddit */}
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "w-full mb-6 bg-white/90",
              })}
              href={`r/${slug}/submit`}
            >
              <span className="text-black font-bold">Create Post</span>
            </Link>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default layout;
