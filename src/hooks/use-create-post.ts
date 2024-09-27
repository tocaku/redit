"use client";

import { createPostPayload } from "@/lib/validation/post";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { StatusCodes } from "http-status-codes";

const useCreatePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate } = useMutation({
    mutationFn: async ({ title, content, subredditId }: createPostPayload) => {
      const payload: createPostPayload = { title, content, subredditId };
      const { data } = await axios.post("/api/subreddit/post/create", payload);
      return data;
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.response?.status === StatusCodes.UNAUTHORIZED) {
          return toast({
            title: "Unauthorized Access",
            description: "You need to login first to create a subreddit",
            variant: "destructive",
          });
        }
        if (e.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          return toast({
            title: "Invalid Post Data",
            description: "Please try to post again",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong.",
        description:
          "Your post was not published due to internal server error. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.push(newPathname);

      router.refresh();

      return toast({
        description: "Your post has been published.",
      });
    },
  });
  return mutate;
};

export default useCreatePost;
