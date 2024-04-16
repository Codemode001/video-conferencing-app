"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

const Meeting = () => {
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleMic = () => {
    setIsMicOpen(!isMicOpen);
  };

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  return (
    <Container>
      <MeetingContainer>
        <Video autoPlay muted loop>
          <source
            src="https://www.w3schools.com/tags/movie.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </Video>
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
        <Button style={{ backgroundColor: "#d93025" }}>Leave Meeting</Button>
      </Controls>
    </Container>
  );
};

export default Meeting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #202124;
  font-family: "Poppins", sans-serif;
  width: 100%;
  margin: 0; /* Resetting margin */
  padding: 0; /* Resetting padding */
`;

const MeetingContainer = styled.div`
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
