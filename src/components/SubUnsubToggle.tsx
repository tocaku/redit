"use client";

import React, { FC } from "react";
import { Button } from "./ui/Button";
import useSubUnsub from "@/hooks/use-sub-unsub";
interface SubUnsubToggleProp {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}
const SubUnsubToggle: FC<SubUnsubToggleProp> = ({
  isSubscribed,
  subredditId,
  subredditName,
}) => {
  const { subscribe, unSubscribe } = useSubUnsub(subredditId, subredditName);
  return (
    <div>
      {isSubscribed ? (
        <Button onClick={() => unSubscribe()}>Leave</Button>
      ) : (
        <Button onClick={() => subscribe()}>Join</Button>
      )}
    </div>
  );
};

export default SubUnsubToggle;
