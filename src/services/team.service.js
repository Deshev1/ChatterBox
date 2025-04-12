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
