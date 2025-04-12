import {
  get,
  set,
  ref,
  push,
  query,
  equalTo,
  orderByChild,
  onValue,
  onDisconnect,
  runTransaction,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getChatsDetails = async (teamId, isUser) => {
  const sourceRef = isUser
    ? ref(db, `users/${teamId}/chats`)
    : ref(db, `teams/${teamId}/details/chats`);
  let chats = (await get(sourceRef)).val();
  let chatsDetails = await Promise.all(
    Object.keys(chats).map(async (chatId) => {
      const chatRef = isUser
        ? ref(db, `chats/${chatId}`)
        : ref(db, `chats/${chatId}/details`);
      const chatDetails = (await get(chatRef)).val();

      chatDetails.id = chatId;
      return chatDetails;
    })
  );

  return chatsDetails;
};
export const subscribeToChats = function (teamId, isUser, callback) {
  const reference = isUser
    ? ref(db, `/users/${teamId}/chats`)
    : ref(db, `/teams/${teamId}/details/chats`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(reference, (snapshot) => {
    if (snapshot.exists()) callback(Object.keys(snapshot.val()));
  });

  return unsubscribe;
};
