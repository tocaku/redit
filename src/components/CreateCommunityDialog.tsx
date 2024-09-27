import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuSeparator } from "@/components/ui/Dropdown-menu";
import CreateCommunity from "./CreateCommunity";

interface CreateCommunityDialogProp {
  children: React.ReactNode;
}

const CreateCommunityDialog: React.FC<CreateCommunityDialogProp> = ({
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="pl-2 text-sm">{children}</DialogTrigger>
      <DialogContent className="bg-[#1A1A1B] border-zinc-600">
        <DialogHeader>
          <DialogTitle>Create a community</DialogTitle>
          <DropdownMenuSeparator className="bg-zinc-700" />

          <DialogTitle>Name</DialogTitle>
          <DialogDescription>
            Community names including capitalization cannot be changed.
          </DialogDescription>
        </DialogHeader>
        <CreateCommunity />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;
