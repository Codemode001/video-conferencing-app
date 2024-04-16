"use client";
import React from "react";
import styled from "styled-components";

import navigateTo from "../custom/navigateto";

const SignUpPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "1rem" }}>Sign Up</h2>
        <SignUpInput type="text" placeholder="Username" />
        <SignUpInput type="email" placeholder="Email" />
        <SignUpInput type="password" placeholder="Password" />
        <SignUpInput type="password" placeholder="Confirm Password" />
        <SignUpButton type="submit" onClick={navigateTo("/")}>
          Sign Up
        </SignUpButton>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUpPage;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignUpForm = styled.form`
  width: 500px;
  padding: 20px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin: 1rem 0;
`;

const SignUpButton = styled.button`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00ac47;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #e0920e;
  }
`;
