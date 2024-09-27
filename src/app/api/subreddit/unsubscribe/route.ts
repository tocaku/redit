import { StatusCodes } from "http-status-codes";
import { subredditSubAndUnsubValidator } from "@/lib/validation/subreddit";
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
    const { subredditId, subredditName } = subredditSubAndUnsubValidator.parse(
      await req.json()
    );
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        name: subredditName,
      },
    });

    if (!subreddit) {
      return new Response("Subreddit does not exists", {
        status: StatusCodes.CONFLICT,
      });
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId: subredditId,
          userId: session.user.id,
        },
      },
    });
    return new Response("Successfully unsubscribed");
  } catch (error) {
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
