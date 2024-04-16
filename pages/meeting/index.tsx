import React from "react";
import styled from "styled-components";

const Meeting = () => {
  return (
    <Container>
      <MeetingContainer>
        <Video controls autoPlay muted>
          <source
            src="https://www.w3schools.com/tags/movie.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </Video>
      </MeetingContainer>
      <Controls>
        <Button>Open Mic</Button>
        <Button>Open Video</Button>
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
  background-color: #f0f4f8;
  font-family: "Poppins", sans-serif;
`;

const MeetingContainer = styled.div`
  width: 80%;
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
  margin: 0 2rem;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
