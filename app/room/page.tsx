"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken } from "../utils/API";
import MeetingView from "@/pages/example";

const Room = () => {
  const meetingId = "jm4b-2w8p-pvdo";
  const router = useRouter();
  const name = useSearchParams();

  const onMeetingLeave = () => {
    console.log("leave");
  };
  console.log(router);
  useEffect(() => {
    console.log(router);
    console.log(name?.get("meetingID"));
  });

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  );
};

export default Room;
