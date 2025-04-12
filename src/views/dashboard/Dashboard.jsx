//CSS
import "./Dashboard.css";

//Dependencies
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Components
import { AppContext } from "../../context/AppContext";
import TeamsBar from "./teams-bar/TeamsBar";
import ChatsBar from "./chats-bar/ChatsBar";

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
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="app-container">
      <div className="app-container">
        <TeamsBar />
        <ChatsBar />
        {/* {isFriendsWindow && <FriendsWindow />} */}
        {/* {isCreateTeam && <CreateTeam />} */}
        {/* {isCreateChat && user.uid === teamId && <CreateGroupChat />} */}
        {/* {isCreateChat && !(user.uid === teamId) && <CreateTeamChat />} */}
        {/* {isChatWindow && <ChatWindow></ChatWindow>} */}
        {/* {isAddMembers && <AddMembers></AddMembers>} */}
      </div>
    </div>
  );
}

export default Dashboard;
