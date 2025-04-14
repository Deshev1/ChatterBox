//CSS
import "./Dashboard.css";

//Dependencies
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Components
import { AppContext } from "../../context/AppContext";
import TeamsBar from "./teams-bar/TeamsBar";
import ChatsBar from "./chats-bar/ChatsBar";
import CreateTeam from "./create-team/CreateTeam";

function Dashboard({
  isCreateChat,
  isCreateTeam,
  isFriendsWindow,
  isChatWindow,
  isAddMembers,
}) {
  const { user, userData, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const { teamId, chatId, filter } = useParams();

  useEffect(() => {
    console.log("AAAAAA");
    if (!user) navigate("/");
  }, [user]);

  //Add loader later
  if (!userData) return;

  return (
    <div className="app-container">
      <TeamsBar />
      <ChatsBar />
      <div onClick={handleLogout}>asdf</div>
      {/* {isFriendsWindow && <FriendsWindow />} */}
      {isCreateTeam && <CreateTeam />}
      {/* {isCreateChat && user.uid === teamId && <CreateGroupChat />} */}
      {/* {isCreateChat && !(user.uid === teamId) && <CreateTeamChat />} */}
      {/* {isChatWindow && <ChatWindow></ChatWindow>} */}
      {/* {isAddMembers && <AddMembers></AddMembers>} */}
    </div>
  );
}

export default Dashboard;
