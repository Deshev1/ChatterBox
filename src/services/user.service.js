import { get, set, query, ref, orderByChild, equalTo } from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = ({ username, uid, email, profilePicture }) => {
  return set(ref(db, `users/${uid}/details`), {
    username,
    email,
    profilePicture,
    createdOn: Date.now(),
  });
};

export const getUserDataByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
};

export const getUserDataByUsername = (username) => {
  const usersRef = ref(db, "users");
  const userQuery = query(
    usersRef,
    orderByChild("details/username"),
    equalTo(username)
  );
  return get(userQuery);
};

export const getUserDetailsByUid = (uid) => {
  return get(ref(db, `users/${uid}/details`));
};

// TS
// export const createUserHandle = ({
//   username,
//   uid,
//   email,
//   phoneNumber,
//   profilePicture,
// }: {
//   username: string,
//   uid: string,
//   email: string,
//   phoneNumber: number,
//   profilePicture: string,
// }) => {
//   return set(ref(db, `users/${uid}/details`), {
//     username,
//     email,
//     phoneNumber,
//     profilePicture,
//     createdOn: Date.now(),
//   });
// };
