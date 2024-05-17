import React, { useState, useRef, useMemo, useEffect } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useRouter } from "next/navigation";

function ParticipantView({
  participantId,
  participantName,
}: {
  participantId: string;
  participantName: String;
}) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={participantId}>
      <p>
        Participant: {participantName} | Webcam: {webcamOn ? "ON" : "OFF"} |
        Mic: {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"200px"}
          width={"300px"}
          onError={(err: any) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
}

export default function MeetingView({
  meetingId,
  userName,
}: {
  meetingId: string;
  userName: String;
}) {
  const [joined, setJoined] = useState<string | null>(null);
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      leaveMeeting();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const router = useRouter();
  const leaveMeeting = () => {
    router.push("/home");
  };

  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <Container>
          <MeetingIdText>Meeting Id: {meetingId}</MeetingIdText>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
              participantName={userName || ""}
            />
          ))}
        </Container>
      ) : (
        <JoinMeetingContainer>
          <h3>Meeting Id: {meetingId}</h3>
          {joined && joined == "JOINING" ? (
            <p>Joining the meeting...</p>
          ) : (
            <JoinButton onClick={joinMeeting}>Join</JoinButton>
          )}
        </JoinMeetingContainer>
      )}
    </div>
  );
}

const MeetingIdText = styled.h3`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
`;

const JoinMeetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const JoinButton = styled.div`
  margin-top: 3rem;
  background-color: #15a9ff;
  width: 10rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: #f8ac0e;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #202124;
  font-family: "Poppins", sans-serif;
  width: 100%;
  margin: 0;
  padding: 0;
`;
