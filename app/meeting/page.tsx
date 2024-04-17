"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

import { createClient } from "../utils/supabase/client";
import navigateTo from "../custom/navigateto";

const supabase = createClient();

const Meeting = () => {
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<any>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userName, setUserName] = useState<any>();

  const fetchUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data && !error) {
        setUserEmail(data.session?.user.email);
        console.log(userEmail);
      }
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  const fetchUserName = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data && !error) {
        setUserName(data.session?.user.user_metadata.displayName);
        console.log(userName);
      }
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  const toggleMic = () => {
    setIsMicOpen(!isMicOpen);
  };

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
    if (!isVideoOpen) {
      startVideo();
    } else {
      stopVideo();
    }
  };

  const startVideo = async () => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    fetchUserEmail();
    fetchUserName();
  }, []);

  return (
    <Container>
      <MeetingContainer>
        {isVideoOpen ? (
          <Video autoPlay muted ref={videoRef} />
        ) : (
          <PlaceHolder
            src="https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
            alt="Placeholder"
          />
        )}
        <UserEmail>{userName ? userName : userEmail}</UserEmail>
      </MeetingContainer>
      <Controls>
        <IconContainer onClick={toggleMic}>
          <FontAwesomeIcon
            icon={isMicOpen ? faMicrophone : faMicrophoneSlash}
            size="2x"
          />
        </IconContainer>
        <IconContainer onClick={toggleVideo}>
          <FontAwesomeIcon
            icon={isVideoOpen ? faVideo : faVideoSlash}
            size="2x"
          />
        </IconContainer>
        <Button
          style={{ backgroundColor: "#d93025" }}
          onClick={navigateTo("/home")}
        >
          Leave Meeting
        </Button>
      </Controls>
      <MeetingID>Meeting ID</MeetingID>
    </Container>
  );
};

export default Meeting;

const PlaceHolder = styled.img``;

const MeetingID = styled.div`
  color: white;
  position: absolute;
  left: 2rem;
  bottom: 2.5rem;
`;

const UserEmail = styled.div`
  color: white;
  z-index: 99999;
  position: absolute;
  bottom: 0;
  left: 1rem;
  font-weight: bold;
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

const MeetingContainer = styled.div`
  position: relative;
  width: 60%;
  max-width: 1200px;
  height: 70vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  background-color: gray;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
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
