import {
  get,
  set,
  query,
  ref,
  orderByChild,
  equalTo,
  onValue,
  onDisconnect,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = ({ username, uid, email, avatar }) => {
  return set(ref(db, `users/${uid}/details`), {
    username,
    email,
    avatar,
    status: "offline",
    createdOn: Date.now(),
  });
};

export const setUserStatus = (uid, status) => {
  return set(ref(db, `users/${uid}/details/status`), status);
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

export async function getUsersData(userUids) {
  const requestsData = await Promise.all(
    userUids.map(async (uid) => {
      const snapshot = await get(ref(db, `users/${uid}/details`));
      const requestData = snapshot.val();
      requestData.uid = uid;
      return snapshot.exists() ? requestData : null;
    })
  );

  return requestsData.length > 0 ? requestsData : null;
}

export const subscribeToStatus = function (uid, setFunction) {
  const reference = ref(db, `/users/${uid}/details/status`);

  const unsubscribe = onValue(reference, (snapshot) => {
    if (snapshot.exists()) setFunction(snapshot.val());
  });

  return unsubscribe;
};

export const subscribeToConnected = (uid) => {
  const connectedRef = ref(db, ".info/connected");

  const unsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      set(ref(db, `users/${uid}/details/status`), "online");
      onDisconnect(ref(db, `users/${uid}/details/status`)).set("offline");
    }
  });

  return () => {
    unsubscribe();
  };
};

// TS
// export const createUserHandle = ({
//   username,
//   uid,
//   email,
//   phoneNumber,
//   avatar,
// }: {
//   username: string,
//   uid: string,
//   email: string,
//   phoneNumber: number,
//   avatar: string,
// }) => {
//   return set(ref(db, `users/${uid}/details`), {
//     username,
//     email,
//     phoneNumber,
//     avatar,
//     createdOn: Date.now(),
//   });
// };
