import CreatePostMock from "@/components/CreatePostMock";
import PostFeed from "@/components/PostFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const session = await getAuthSession();
  // const initialPosts = await db.post.findMany({
  //   where: {
  //     subreddit: {
  //       name: slug,
  //     },
  //   },
  //   take: 1,
  // });
  return (
    <div>
      <CreatePostMock user={session?.user} />
      {/* post feed */}
      <PostFeed />
    </div>
  );
};

export default page;
