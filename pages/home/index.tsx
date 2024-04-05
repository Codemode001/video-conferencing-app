import React from "react";
import styled, { keyframes } from "styled-components";

const navigateTo = (path: string) => () => {
  window.location.href = path;
};

const HomePage = () => {
  return (
    <Container>
      <Title>
        Welcome to <span style={{ color: "#0aa5ff" }}>WiMeet</span>
      </Title>
      <Subtitle>The place where meetings come to life!</Subtitle>
      <ButtonContainer>
        <Button onClick={navigateTo("/create-meeting")}>Create Meeting</Button>
        <Button onClick={navigateTo("/join-meeting")}>Join Meeting</Button>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.a`
  background-color: #0aa5ff;
  color: #fff;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
