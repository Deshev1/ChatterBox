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
export const getChatData = async (chatId) => {
  try {
    const chatRef = ref(db, `chats/${chatId}`);
    const snapshot = await get(chatRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Chat not found");
    }
  } catch (error) {
    console.error(error.message);
  }
};

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

export const subscribeToMessages = function (chatId, callback) {
  const chatMessagesRef = ref(db, `/chats/${chatId}/messages`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(chatMessagesRef, (snapshot) => {
    if (snapshot.exists())
      callback((prev) => {
        return { ...prev, messages: snapshot.val() };
      });
  });

  return unsubscribe;
};

export const sendMessage = async function (messageObject, chatId) {
  const newMessageRef = await push(ref(db, `/chats/${chatId}/messages`));
  return await set(newMessageRef, messageObject);
};
