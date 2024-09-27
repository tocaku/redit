import { subredditSubAndUnsubPayload } from "@/lib/validation/subreddit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "./use-toast";

const useSubUnsub = (subredditId: string, subredditName: string) => {
  const router = useRouter();
  const { mutate: subscribe } = useMutation({
    mutationFn: async () => {
      const payload: subredditSubAndUnsubPayload = {
        subredditId,
        subredditName,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data;
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e?.response?.status === 401) {
          return toast({
            title: "Please Login first",
            description: "You need to login first to leave this subreddit",
            variant: "destructive",
          });
        }
        if (e.response?.status === 400) {
          return toast({
            title: "Subreddit doesn't exist",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: `Successfully joined r/${subredditName}`,
        variant: "default",
      });
    },
  });
  const { mutate: unSubscribe } = useMutation({
    mutationFn: async () => {
      const payload: subredditSubAndUnsubPayload = {
        subredditId,
        subredditName,
      };
      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data;
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e?.response?.status === 401) {
          return toast({
            title: "Please Login first",
            description: "You need to login first to leave this subreddit",
            variant: "destructive",
          });
        }
        if (e.response?.status === 400) {
          return toast({
            title: "Subreddit doesn't exist",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: `Successfully leave r/${subredditName}`,
        variant: "default",
      });
    },
  });
  return { subscribe, unSubscribe };
};

export default useSubUnsub;
