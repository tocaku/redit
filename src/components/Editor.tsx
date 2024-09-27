"use client";

import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { createPostPayload, createPostValidator } from "@/lib/validation/post";
import "@/styles/editor.css";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/Input";
import useCreatePost from "@/hooks/use-create-post";

type FormData = z.infer<typeof createPostValidator>;
interface EditorProps {
  subredditId: string;
}

const maxInputLength = 20;
export const Editor: React.FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [wordLength, setWordLength] = useState(maxInputLength);
  const [input, setInput] = useState("");
  const mutate = useCreatePost();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();

    const payload: createPostPayload = {
      title: data.title,
      content: blocks,
      subredditId,
    };
    mutate(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-primary rounded-lg border border-primary mb-4 ">
      <div
        className="bg-primary flex w-full gap-4 items-center border-2 rounded-md 
       border-zinc-700 "
      >
        <Input
          ref={(e) => {
            titleRef(e);
            // @ts-ignore
            _titleRef.current = e;
          }}
          {...rest}
          placeholder="Please write on me"
          className="text-zinc-200 border-none  bg-transparent  focus-visible:ring-offset-0 focus-visible:ring-0 selection:bg-blue-600"
          maxLength={maxInputLength}
          onChange={(e) => {
            setInput((textValue: string) => {
              setWordLength((prev: number) => {
                const inputLength = e.target.value.length;
                if (inputLength <= 0) {
                  return maxInputLength;
                }
                return inputLength;
              });
              return e.target.value;
            });
          }}
          value={input}
        />
        <p className="text-zinc-400 w-16 text-xs font-bold">{`${wordLength} / ${maxInputLength}`}</p>
      </div>
      {errors.title && (
        <p className="text-red-500 text-xs">{errors.title?.message}</p>
      )}
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert text-zinc-200 selection:bg-blue-600">
          <div id="editor" className="min-h-[500px] text-zinc-200" />
          <p className="text-sm text-zinc-400">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};
