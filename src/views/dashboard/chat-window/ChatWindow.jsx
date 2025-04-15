import "./ChatWindow.css";

//Components
import ChatHeader from "./chat-header/ChatHeader";
import ChatBody from "./chat-body/ChatBody";
// import Center from "../../../components/center/Center";
// import Loader from "../../../components/loader/Loader";

//Dependency
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Services
import { getUsersData } from "../../../services/user.service";
import { getChatData } from "../../../services/chat.service";

function ChatWindow() {
  const [chatData, setChatData] = useState(null);
  const [receiversData, setReceiversData] = useState(null);
  const [loader, setLoader] = useState(null);

  const { user, userData } = useContext(AppContext);
  const { chatId } = useParams();

  //Fetch chat and members data
  useEffect(() => {
    setLoader(true);
    getChatData(chatId)
      .then((data) => {
        data.members = Object.keys(data.members).filter(
          (member) => member !== user.uid
        );
        data.uid = chatId;
        setChatData(data);
        return getUsersData(data.members);
      })
      .then((data) => {
        setReceiversData(data ? data : "team-chat");
      })
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(setLoader(false));
  }, [chatId]);

  if (!chatData || loader || !receiversData) return <p>loading</p>;

  return (
    <div className="active-chat-window">
      <ChatHeader
        chatData={chatData}
        receiversData={
          receiversData
            ? receiversData
            : [user.uid, { status: userData.status }]
        }
      ></ChatHeader>
      <ChatBody
        setChatData={setChatData}
        receiversData={receiversData}
        chatData={chatData}
      ></ChatBody>
    </div>
  );
}

export default ChatWindow;
