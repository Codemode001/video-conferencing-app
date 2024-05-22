export const authToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMDllMzRiOC00YmRlLTRlYzUtOTQzZi05Y2FiMmQ0ZDY5MzAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjM4Nzk0NywiZXhwIjoxNzE4OTc5OTQ3fQ.H54YQyqwbubvO6NxIoMtlb3JSvgykt-xjUTrejgFfDg";

export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};
