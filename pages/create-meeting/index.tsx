import React from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";

const CreateMeeting = () => {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/meeting");
  };

  return (
    <Container>
      <Title>Create a New Meeting</Title>
      <Subtitle>Enter meeting details below</Subtitle>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="meetingName">Meeting Name:</Label>
        <Input type="text" id="meetingName" name="meetingName" required />
        <Label htmlFor="meetingPassword">Meeting Password:</Label>
        <Input
          type="password"
          id="meetingPassword"
          name="meetingPassword"
          required
        />
        <Button type="submit">Create Meeting</Button>
      </FormContainer>
    </Container>
  );
};

export default CreateMeeting;

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
