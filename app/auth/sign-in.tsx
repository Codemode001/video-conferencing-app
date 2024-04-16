"use client";
import * as React from "react";
import { CssBaseline, TextField, Link, Grid, Container } from "@mui/material";
import styled from "styled-components";

import { login } from "../utils/supabase/actions";

export default function SignInSide() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    formData.append("email", data.get("email") as string);
    formData.append("password", data.get("password") as string);

    try {
      await login(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <MainContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Logo src="https://res.cloudinary.com/dhhamkkue/image/upload/v1713231977/WiMeet/Black_White_Elegant_Monogram_Initial_Name_Logo_p6dk87.png" />
          </div>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ButtonsContainer>
              <Login type="submit">Sign In</Login>
              <div style={{ width: "50%", textAlign: "center" }}>
                <SignUp>CREATE ACCOUNT</SignUp>
                <ForgotPass>Forgot Password?</ForgotPass>
              </div>
            </ButtonsContainer>
          </form>
        </div>
      </Container>
    </MainContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ForgotPass = styled.div`
  color: #2684fc;
  margin-top: 5px;
  cursor: pointer;
`;

const SignUp = styled.button`
  border: none;
  background-color: #f8ac0e;
  width: 90%;
  height: 3rem;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: background-color 0.5s ease;
  font-weight: bold;

  &:hover {
    background-color: #00ac47;
  }
`;

const Login = styled.button`
  background-color: #1a73e8;
  color: white;
  width: 40%;
  height: 5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  width: 90%;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
