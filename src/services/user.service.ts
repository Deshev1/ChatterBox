import { set, ref } from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = ({
  username,
  uid,
  email,
  phoneNumber,
  profilePicture,
}: {
  username: string;
  uid: string;
  email: string;
  phoneNumber: number;
  profilePicture: string;
}) => {
  return set(ref(db, `users/${uid}/details`), {
    username,
    email,
    phoneNumber,
    profilePicture,
    createdOn: Date.now(),
  });
};
