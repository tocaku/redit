import { z } from "zod";

export const createPostValidator = z.object({
  title: z
    .string()
    .min(8, { message: "Title must be at least 8 characters" })
    .max(121, { message: "Title must be at most 121 characters" }),
  content: z.any(),
  subredditId: z.string(),
});

export type createPostPayload = z.infer<typeof createPostValidator>;
