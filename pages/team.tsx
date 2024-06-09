"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import styled from "styled-components";

const supabase = createClient();

const Team = () => {
  const [team, setTeam] = useState<any[]>([]);

  const fetchTeamNames = async () => {
    try {
      const { data, error } = await supabase
        .from("team")
        .select("firstName, lastName, section");
      if (error) {
        console.error("Error fetching team data:", error);
      } else {
        setTeam(data);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    fetchTeamNames();
  }, []);

  useEffect(() => {
    console.log(team);
  }, []);

  return (
    <Container>
      {team.length > 0 ? (
        team.map((member, index) => (
          <div>
            <div key={index} style={{ display: "flex" }}>
              <Name>
                {member.firstName} {member.lastName}
              </Name>
            </div>
            <Age>{member.section}</Age>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

const Age = styled.div`
  margin-top: 1rem;
  color: green;
`;

const Position = styled.div`
  color: blue;
  letter-spacing: 1px;
`;

const Name = styled.h1`
  font-size: 1.8rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  gap: 3rem;
  width: 100%;
  font-family: sans-serif;
`;

export default Team;
