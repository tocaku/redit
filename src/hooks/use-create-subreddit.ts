import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createSubredditPayload } from "@/lib/validation/subreddit";
import { toast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";

const useCreateSubreddit = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const { mutate } = useMutation({
    mutationFn: async () => {
      const payload: createSubredditPayload = {
        subRedditName: input,
      };

      const { data } = await axios.post("/api/subreddit/", payload);
      return data;
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          return toast({
            title: "Unauthorized Access",
            description: "You need to login first to create a subreddit",
            variant: "destructive",
          });
        }
        if (e.response?.status === 409) {
          return toast({
            title: "Subreddit name already exists",
            description: "Please try to use different subreddit name",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
  return { input, setInput, mutate };
};

export default useCreateSubreddit;
