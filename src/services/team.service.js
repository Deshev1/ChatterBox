import {
  get,
  set,
  ref,
  push,
  update,
  runTransaction,
  onValue,
} from "firebase/database";
import { db } from "../config/firebase-config";

const teamsRef = ref(db, "teams/");

export const createTeam = async (
  name,
  ownerId,
  imageUrl = "default-team.png"
) => {
  // Check if team name already exists
  const snapshot = await get(teamsRef);
  const teams = snapshot.val();
  if (teams) {
    const nameExists = Object.values(teams).some((team) => team.name === name);
    if (nameExists) throw new Error("Team name already exists.");
  }
  // Create a new team with a unique ID
  const userTeamsRef = ref(db, `users/${ownerId}/teams`);

  const newTeamRef = push(teamsRef);
  const teamId = newTeamRef.key;
  const teamData = {
    details: { name, owner: ownerId, imageUrl },
    members: { [ownerId]: true },
  };

  try {
    await set(newTeamRef, teamData);
    const generalChat = await createTeamChat(
      teamId,
      "General",
      [ownerId],
      null
    );

    await update(userTeamsRef, { [teamId]: true });

    // const updates = {};
    // members.forEach((memberUid) => {
    //   updates[`users/${memberUid}/teams/${teamId}`] = true;
    // });
    // await update(ref(db), updates);

    // Increment the teamsCount
    const teamsCountRef = ref(db, "teams/teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    return { ...teamData, chats: generalChat, id: teamId };
  } catch (error) {
    throw new Error("Error creating team: " + error.message);
  }
};

export const getTeamsDetails = async (teams) => {
  let teamsDetails = await Promise.all(
    teams.map(async (teamId) => {
      const teamDetails = (await get(ref(db, `teams/${teamId}/details`))).val();
      teamDetails.id = teamId;
      return teamDetails;
    })
  );

  return teamsDetails;
};

export const subscribeToTeams = function (userUid, callback) {
  const teamsRef = ref(db, `/users/${userUid}/teams`);

  const unsubscribe = onValue(teamsRef, (snapshot) => {
    if (snapshot.exists()) callback(Object.keys(snapshot.val()));
  });

  return unsubscribe;
};

export const leaveTeam = async function (teamUid, userUid) {
  const teamRef = ref(db, `teams/${teamUid}`);

  const teamMembersRef = ref(db, `teams/${teamUid}/members`);
  const userRef = ref(db, `users/${userUid}/teams`);

  await Promise.all([
    update(teamMembersRef, { [userUid]: null }),
    update(userRef, { [teamUid]: null }),
  ]);

  const teamMembersSnapshot = await get(teamMembersRef);

  //If no members remove team
  if (!teamMembersSnapshot.exists()) {
    await set(teamRef, null);
    const teamsCountRef = ref(db, "teams/teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 0) - 1;
    });
  }
};
