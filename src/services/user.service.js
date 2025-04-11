import { set, ref } from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = ({
  username,
  uid,
  email,
  phoneNumber,
  profilePicture,
}) => {
  return set(ref(db, `users/${uid}/details`), {
    username,
    email,
    phoneNumber,
    profilePicture,
    createdOn: Date.now(),
  });
};

export const getUserDataByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
};

export const getUserDataByUsername = (username) => {
  return get(
    query(ref(db, "users"), orderByChild("username"), equalTo(username))
  );
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
