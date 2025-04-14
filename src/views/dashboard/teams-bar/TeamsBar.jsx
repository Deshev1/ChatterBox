//CSS
import "./TeamsBar.css";
import defaultTeam from "../../../assets/icons/defaultTeam.svg";
import plusSign from "../../../assets/icons/plusSign.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";
import Logo from "../../../components/logo/Logo";
import { AppContext } from "../../../context/AppContext";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  getTeamsDetails,
  subscribeToTeams,
} from "../../../services/team.service";

function TeamsBar() {
  const [teamsDetails, setTeamsDetails] = useState(null);
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTeamClick = async (teamDetails) => {
    const firstChatId = Object.keys(teamDetails.chats)[0];
    navigate(`/${teamDetails.id}/${firstChatId}`);
  };

  function handleFetchTeamsDetails(teamsIds) {
    getTeamsDetails(teamsIds).then((teamsDetails) =>
      setTeamsDetails(teamsDetails)
    );
  }

  useEffect(() => {
    const unsubscribe = subscribeToTeams(user.uid, handleFetchTeamsDetails);
    if (userData?.teams) {
      handleFetchTeamsDetails(Object.keys(userData.teams));
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="teams-bar">
      <div className="teams-logo">
        <Logo
          size={40}
          handleClick={() => navigate(`/${user.uid}/friends/all`)}
        />
      </div>
      <div className="teams-list">
        {teamsDetails &&
          teamsDetails.map((team) => {
            return (
              <Avatar
                handleClick={() => console.log("hi")}
                key={team.id}
                tooltip={team.name}
                imageUrl={team?.imageUrl || defaultTeam}
                onClick={() => handleTeamClick(team)}
                hover={true}
              />
            );
          })}
      </div>
      <Avatar
        handleClick={() => navigate(`/${user.uid}/create-team`)}
        imageUrl={plusSign}
        hover={true}
        padding={10}
      />
    </div>
  );
}

export default TeamsBar;
