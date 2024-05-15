import React, { useEffect, useState, useMemo, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Slide, Fade } from "react-awesome-reveal";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

import navigateTo from "@/app/custom/navigateto";
import { createClient } from "@/app/utils/supabase/client";
import { authToken, createMeeting } from "../../app/utils/API";

const supabase = createClient();

function JoinScreen({
  getMeetingAndToken,
}: {
  getMeetingAndToken: (meeting?: string) => void;
}) {
  return null;
}

function ParticipantView({ participantId }: { participantId: string }) {
  return null;
}

function Controls() {
  return null;
}

function MeetingView({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) {
  return null;
}

const HomePage = () => {
  const [userEmail, setUserEmail] = useState<any>();
  const [toggleProfile, setToggleProfile] = useState(false);
  const [userName, setUserName] = useState<any>();
  const [userId, setuserId] = useState<any>();
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const fetchUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data && !error) {
        setUserEmail(data.session?.user.email);
        setuserId(data.session?.user.id);
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

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/";
      alert("User Signed Out!");
    } else {
      alert(error.message);
    }
  }

  async function createMeetingSupa() {
    const { data, error } = await supabase.from("meetings").insert([
      {
        host: userId,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return null;
    }

    window.location.href = "/meeting";
    console.log("Meeting data inserted successfully:", data);
    return data;
  }

  const getMeetingAndToken = async (id?: string) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const newMeeting = async () => {
    getMeetingAndToken(meetingId !== null ? meetingId : undefined);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  useEffect(() => {
    fetchUserEmail();
    fetchUserName();
  });
  useEffect(() => {
    console.log(meetingId);
  }, [meetingId]);

  return (
    <Container>
      <UserContainer>
        {!userName ? <Email>{userEmail}</Email> : <Email>{userName}</Email>}
        <Profile
          src="https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
          onClick={() => setToggleProfile(!toggleProfile)}
        />
        {toggleProfile === true ? (
          <Dropdown>
            <LogoutButton onClick={signOut}>Logout</LogoutButton>
          </Dropdown>
        ) : null}
      </UserContainer>
      <Slide direction="left">
        <Title>
          Welcome to <span style={{ color: "#0aa5ff" }}>WiMeet</span>
        </Title>
      </Slide>
      <Fade>
        <Subtitle>The place where meetings come to life!</Subtitle>
      </Fade>
      <Fade direction="right">
        <ButtonContainer>
          <Button onClick={newMeeting}>Start a Meeting</Button>
          <Button onClick={navigateTo("/join-meeting")}>Join a Meeting</Button>
        </ButtonContainer>
      </Fade>
    </Container>
  );
};

export default HomePage;

const Email = styled.div`
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #282828;
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  cursor: pointer;
`;

const UserContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 5rem;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5rem;
  width: 5rem;
`;

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
  position: relative;

  &:hover ${Dropdown} {
    display: block;
  }
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

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f00;
  }
`;
