"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken } from "../utils/API";
import MeetingView from "@/pages/example";

const Room = () => {
  const name = useSearchParams();
  const meetingId = name?.get("meetingID");
  const router = useRouter();
  const userName = name?.get("name");

  useEffect(() => {
    console.log(router);
    console.log(name?.get("meetingID"));
    console.log(name?.get("name"));
  });

  return (
    <MeetingProvider
      config={{
        meetingId: meetingId || "",
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId || ""} userName={userName || ""} />
    </MeetingProvider>
  );
};

export default Room;
