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
  console.log(name);
  try {
    //Get all teams
    const snapshot = await get(teamsRef);
    const teams = snapshot.val();

    //If there are teams, go through each details object and check if any existing team has the same name as the newly created one.
    if (teams) {
      const nameExists = Object.values(teams).some((team) => {
        //Skip teamsCount property
        console.log(typeof team);
        if (typeof team !== "object") return;

        //Return true of a match is found
        return team.details.name === name;
      });
      if (nameExists) throw new Error("Team name already exists.");
    }

    // Create a new team with a unique ID
    const newTeamRef = push(teamsRef);

    //Team details
    const teamId = newTeamRef.key;
    const teamData = {
      details: { name, owner: ownerId, imageUrl },
      members: { [ownerId]: true },
    };

    //Set team data in firebase
    await set(newTeamRef, teamData);

    //Create a new chat for this team
    const generalChat = await createTeamChat(
      teamId,
      "General",
      [ownerId],
      null
    );

    //Update each members team list
    const updates = {};
    Object.keys(teamData.members).forEach((memberUid) => {
      updates[`users/${memberUid}/teams/${teamId}`] = true;
    });
    await update(ref(db), updates);

    // Increment the teamsCount
    const teamsCountRef = ref(db, "teams/teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    return { ...teamData, chats: generalChat, id: teamId };
  } catch (error) {
    console.log(error.message);
    throw new Error("Error creating team: " + error.message);
  }
};

export const createTeamChat = async (
  teamId,
  name,
  creatorId,
  imageUrl = "default-chat.png"
) => {
  try {
    if (name.length < 3 || name.length > 40) {
      throw new Error("Channel name must be between 3 and 40 characters.");
    }
    const chatsRef = ref(db, `chats`);
    const teamChatsRef = ref(db, `teams/${teamId}/chats`);

    const newChatRef = push(chatsRef);
    const chatId = newChatRef.key;
    const channelData = {
      details: { name, imageUrl },
      members: { [creatorId]: true },
    };

    await set(newChatRef, channelData);
    await update(teamChatsRef, { [chatId]: true });

    return { [chatId]: channelData };
  } catch (e) {
    console.error(e.message);
  }
};

export const getTeamsDetails = async (teams) => {
  try {
    let teamsDetails = await Promise.all(
      teams.map(async (teamId) => {
        const teamDetails = (
          await get(ref(db, `teams/${teamId}/details`))
        ).val();

        return { ...teamDetails, id: teamId };
      })
    );

    return teamsDetails;
  } catch (e) {
    console.error(e.message);
  }
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
