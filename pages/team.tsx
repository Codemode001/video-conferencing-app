"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import styled from "styled-components";

const supabase = createClient();

const Team = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedSection, setEditedSection] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newSection, setNewSection] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      const id = data.session?.user.id;
      console.log(id);
      if (data) {
        const { data, error } = await supabase
          .from("role")
          .select("admin")
          .eq("id", id)
          .single();
        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data && data.admin) {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const fetchTeamNames = async () => {
    try {
      const { data, error } = await supabase
        .from("team")
        .select("id, firstName, lastName, section");
      if (error) {
        console.error("Error fetching team data:", error);
      } else {
        setTeam(data);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member.id);
    setEditedFirstName(member.firstName);
    setEditedLastName(member.lastName);
    setEditedSection(member.section);
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("team")
        .update({
          firstName: editedFirstName,
          lastName: editedLastName,
          section: editedSection,
        })
        .eq("id", editingMember);
      if (error) {
        console.error("Error updating member:", error);
      } else {
        fetchTeamNames();
        setEditingMember(null);
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const { error } = await supabase.from("team").delete().eq("id", id);
      if (error) {
        console.error("Error deleting member:", error);
      } else {
        fetchTeamNames();
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const { error } = await supabase.from("team").insert([
        {
          firstName: newFirstName,
          lastName: newLastName,
          section: newSection,
        },
      ]);
      if (error) {
        console.error("Error creating member:", error);
      } else {
        fetchTeamNames();
        setNewFirstName("");
        setNewLastName("");
        setNewSection("");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  useEffect(() => {
    fetchTeamNames();
    fetchUserRole();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", gap: "3rem" }}>
        {team.length > 0 ? (
          team.map((member) => (
            <div key={member.id}>
              {editingMember === member.id ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedSection}
                    onChange={(e) => setEditedSection(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEditingMember(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex" }}>
                    <Name>
                      {member.firstName} {member.lastName}
                    </Name>
                  </div>
                  <Age>{member.section}</Age>
                  <button onClick={() => handleEdit(member)}>Edit</button>
                  <button onClick={() => handleDelete(member.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {isAdmin && (
        <CreateForm>
          <input
            type="text"
            placeholder="First Name"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Section"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
        </CreateForm>
      )}
    </Container>
  );
};

const Age = styled.div`
  margin-top: 1rem;
  color: green;
`;

const Name = styled.h1`
  font-size: 1.8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  gap: 3rem;
  width: 100%;
  font-family: sans-serif;
`;

const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default Team;
