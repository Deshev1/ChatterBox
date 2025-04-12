//Misc imports
import "./ChatsBar.css";
import plusSign from "../../../assets/plus.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

import chatLogo from "../../../assets/default-chat.svg";

//Dependency imports
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Services
import { leaveTeam } from "../../../services/team.service";
import {
  getChatsDetails,
  subscribeToChats,
} from "../../../services/chat.service";
import { getUserDetailsByUid } from "../../../services/user.service";

//Component imports
import UserHeader from "./user-header/UserHeader";
import ChatPreview from "./chat-preview/ChatPreview";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar() {
  const [chats, setChats] = useState(null);
  const { user, userData } = useContext(AppContext);
  const { teamId, chatId } = useParams();
  const navigate = useNavigate();
  const isInDMs = teamId === user.uid;

  const handleFetchChats = async function () {
    if (isInDMs && !userData?.chats) {
      return;
    }

    let chatsDetails = await getChatsDetails(teamId, isInDMs);

    if (isInDMs) {
      //Update chat details
      const updatedChatsDetails = await Promise.all(
        chatsDetails.map(async (chat) => {
          //Get receiver uid
          const receiver = Object.keys(chat.members).filter(
            (member) => member !== user.uid
          );
          //Get receivers data
          const receiverData = (await getUserDetailsByUid(receiver[0])).val();
          //return chat data with name equaling receivers name
          return {
            ...chat,
            name: receiverData.username,
            imageUrl: receiverData.profilePicture,
            status: receiverData.status,
            userUid: receiver[0],
          };
        })
      );

      setChats(updatedChatsDetails);

      return;
    }

    setChats(chatsDetails);
  };

  useEffect(() => {
    handleFetchChats();
    const unsubscribe = subscribeToChats(teamId, isInDMs, handleFetchChats);

    if (isInDMs && !userData?.chats) {
      setChats(null);
      return;
    }

    return () => {
      unsubscribe();
    };
  }, [teamId]);

  return (
    <div className="chats-bar">
      <UserHeader></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container`}>
        {chats &&
          chats.map((chat) => {
            return (
              <ChatPreview
                key={chat.id}
                chat={{
                  name: chat.name,
                  imageUrl: chat.imageUrl || chatLogo,
                  status: chat?.status,
                  userUid: chat?.userUid,
                }}
                isActive={chat.id === chatId}
                setActiveChat={() => navigate(`/${teamId}/${chat.id}`)}
              />
            );
          })}
      </div>

      {!isInDMs && (
        <div className="chatbar-btns">
          <FontAwesomeIcon
            onClick={() => navigate(`/${teamId}/add-members`)}
            icon={faUserPlus}
            className="add-members-btn"
          />
          <Avatar
            handleClick={() => navigate(`/${teamId}/create-chat`)}
            imageUrl={plusSign}
            size={40}
            hover={true}
          />
          <FontAwesomeIcon
            onClick={() => {
              leaveTeam(teamId, user.uid);
              navigate(`/home`);
            }}
            icon={faDoorOpen}
            className="add-members-btn"
          />
        </div>
      )}
    </div>
  );
}

export default ChatsBar;
