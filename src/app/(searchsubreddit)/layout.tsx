import { EditorProvider } from "@/context/Input";
import React, { FC } from "react";

interface LayoutProp {
  children: React.ReactNode;
}
const layout: FC<LayoutProp> = ({ children }) => {
  return (
    <div>
      <EditorProvider>{children}</EditorProvider>
    </div>
  );
};

export default layout;
