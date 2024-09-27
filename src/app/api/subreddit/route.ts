import { StatusCodes } from "http-status-codes";
import { createSubredditValidator } from "@/lib/validation/subreddit";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized access", {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const { subRedditName } = createSubredditValidator.parse(await req.json());
    const existedSubReddit = await db.subreddit.findFirst({
      where: {
        name: subRedditName,
      },
      include: {
        subscribers: true,
        creator: true,
        posts: true,
      },
    });

    if (existedSubReddit) {
      return new Response("Subreddit name already exists", {
        status: StatusCodes.CONFLICT,
      });
    }

    const subreddit = await db.subreddit.create({
      data: {
        name: subRedditName,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        subredditId: subreddit.id,
        userId: session.user.id,
      },
    });
    return new Response(subreddit.name);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return new Response("Invalid Subreddit Name", {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
      });
    }
    return new Response("Something went wrong", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
