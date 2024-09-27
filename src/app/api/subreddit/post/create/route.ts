import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createPostValidator } from "@/lib/validation/post";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const { subredditId, title, content } = createPostValidator.parse(
      await req.json()
    );

    await db.post.create({
      data: {
        content,
        title,
        subredditId,
        authorId: session?.user.id,
      },
    });

    return new Response("Your post has been created successfully", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid Post data.", {
        status: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS,
      });
    }
    return new Response("Some went wrong.", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
