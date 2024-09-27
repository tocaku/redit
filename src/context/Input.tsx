"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

type InputContextType = {
  input?: string | undefined;
  setInput?: Dispatch<SetStateAction<string>>;
  subreddit?: string | undefined;
  setSubreddit?: Dispatch<SetStateAction<string>>;
};
export const InputContext = createContext<InputContextType>({});
export const EditorProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [subreddit, setSubreddit] = useState("");

  return (
    <InputContext.Provider value={{ input, setInput, subreddit, setSubreddit }}>
      {children}
    </InputContext.Provider>
  );
};
