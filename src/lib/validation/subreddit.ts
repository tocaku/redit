import { z } from "zod";

export const createSubredditValidator = z.object({
  subRedditName: z.string(),
});

export const subredditSubAndUnsubValidator = z.object({
  subredditId: z.string(),
  subredditName: z.string(),
});

export type createSubredditPayload = z.infer<typeof createSubredditValidator>;
export type subredditSubAndUnsubPayload = z.infer<
  typeof subredditSubAndUnsubValidator
>;
