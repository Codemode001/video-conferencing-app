import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { createMeeting, authToken } from "@/app/utils/API";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import MeetingView from "../example";

function JoinScreen({
  getMeetingAndToken,
}: {
  getMeetingAndToken: (meeting?: string) => void;
}) {
  return null;
}

const JoinMeeting = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const [meetingId, setMeetingId] = useState<string | null>("jm4b-2w8p-pvdo");
  const router = useRouter();
  const [isMeeting, setIsMeeting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Joining meeting with code:", meetingCode);
    router.push("/meeting");
  };

  const getMeetingAndToken = async (id?: string) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const joinMeeting = async () => {
    getMeetingAndToken(meetingId !== null ? meetingId : undefined);
  };

  const passMeeing = (e: any) => {
    e.preventDefault();
    // router.push(`/room?meetingId=${meetingId}`);
    router.push({
      pathname: "/room",
      query: { meetingID: meetingId },
    });
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  const doNothing = () => {
    console.log("input something");
  };

  return (
    <Container>
      <Title>Join a Meeting</Title>
      <Subtitle>Enter the meeting code below</Subtitle>
      {/* <FormContainer onSubmit={handleSubmit}> */}
      <FormContainer>
        <Label htmlFor="meetingCode">Meeting Code:</Label>
        <Input
          type="text"
          // id="meetingCode"
          // name="meetingCode"
          // value={meetingCode}
          // onChange={(e) => setMeetingCode(e.target.value)}
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          required
        />
        <Button onClick={passMeeing}>Join Meeting</Button>
      </FormContainer>
      {/* 
      <MeetingProvider
        config={{
          meetingId: meetingId ?? "",
          micEnabled: true,
          webcamEnabled: true,
          name: "C.V. Raman",
          debugMode: false,
        }}
        token={authToken}
      >
        <MeetingView
          meetingId={meetingId ?? ""}
          onMeetingLeave={onMeetingLeave}
        />
      </MeetingProvider> */}
    </Container>
  );
};

export default JoinMeeting;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f0f4f8;
  font-family: "Poppins", sans-serif;
  animation: ${fadeIn} 0.5s ease;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #555;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
