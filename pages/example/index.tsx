"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faMicrophoneSlash,
  faVideoSlash,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

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
    <ParticipantContainer key={participantId}>
      <ParticipantName>
        <p>{participantName}</p>
      </ParticipantName>
      <Indicators style={{ color: micOn ? "blue" : "red" }}>
        <FontAwesomeIcon
          icon={micOn ? faVolumeHigh : faMicrophoneSlash}
          size="1x"
        />
      </Indicators>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn ? (
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
      ) : (
        <PlaceHolder
          src="https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
          alt="Placeholder"
        />
      )}
    </ParticipantContainer>
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

  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const router = useRouter();
  const leaveMeeting = () => {
    router.push("/home");
    leave();
  };

  const [isMicOpen, setIsMicOpen] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  const micToggle = () => {
    toggleMic();
    setIsMicOpen(!isMicOpen);
  };

  const videoToggle = () => {
    toggleWebcam();
    setIsVideoOpen(!isVideoOpen);
  };

  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <Container>
          <MeetingIdText>Meeting Id: {meetingId}</MeetingIdText>
          <ParticipantsLayout>
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
                participantName={userName || ""}
              />
            ))}
          </ParticipantsLayout>
          <Controler>
            <IconContainer onClick={micToggle}>
              <FontAwesomeIcon
                icon={isMicOpen ? faMicrophone : faMicrophoneSlash}
                size="2x"
              />
            </IconContainer>
            <IconContainer onClick={videoToggle}>
              <FontAwesomeIcon
                icon={isVideoOpen ? faVideo : faVideoSlash}
                size="2x"
              />
            </IconContainer>
            <Button
              style={{ backgroundColor: "#d93025" }}
              onClick={leaveMeeting}
            >
              Leave Meeting
            </Button>
          </Controler>
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

const ParticipantsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ParticipantName = styled.div`
  position: absolute;
  left: 1.5rem;
  bottom: 0.5rem;
  color: white;
  font-weight: bold;
`;

const ParticipantContainer = styled.div`
  position: relative;
`;

const MeetingIdText = styled.h3`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  z-index: 99999;
  background-color: #202124;
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

const Controler = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2rem;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  transition: background-color 0.3s ease;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Indicators = styled.div`
  color: blue;
  z-index: 99999;
  position: absolute;
  right: 2rem;
  top: 1rem;
`;
const PlaceHolder = styled.img`
  height: 200px;
  width: 300px;
`;
