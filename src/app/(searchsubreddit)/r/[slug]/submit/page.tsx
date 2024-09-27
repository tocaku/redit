import { Editor } from "@/components/Editor";
import SearchSubreddit from "@/components/SearchSubreddit";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

const page = async ({
  params: { slug: subredditName },
}: {
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const subscriptions = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: {
        select: {
          id: true,
          name: true,
          subscribers: true,
        },
      },
    },
  });
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: subredditName,
    },
  });

  if (!subreddit) notFound();
  return (
    <div>
      <SearchSubreddit subscription={subscriptions} />
      <Editor subredditId={subreddit.id} />
      <Button type="submit" className="w-full" form="subreddit-post-form">
        Post
      </Button>
    </div>
  );
};

export default page;
