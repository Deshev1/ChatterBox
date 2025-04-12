//Misc
import "./ChatPreview.css";

//Components
import Avatar from "../../../../components/avatar/Avatar";

import { useState, useEffect } from "react";

import { subscribeToStatus } from "../../../../services/user.service";

function ChatPreview({ chat, isActive, setActiveChat }) {
  const [status, setStatus] = useState(chat.status);

  useEffect(() => {
    const unsubscribe = subscribeToStatus(chat.userUid, setStatus);

    return () => {
      unsubscribe();
    };
  }, [status]);

  return (
    <div
      className={`chat-container ${isActive ? "active" : ""}`}
      onClick={setActiveChat}
    >
      <Avatar
        status={status}
        imageUrl={chat.imageUrl}
        userUid={chat.userUid}
      ></Avatar>
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-status">{status}</div>
      </div>
    </div>
  );
}

export default ChatPreview;
