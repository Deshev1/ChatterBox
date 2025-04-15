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
import { getTeamsData, subscribeToTeams } from "../../../services/team.service";

function TeamsBar() {
  const [teamsData, setTeamsData] = useState(null);
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTeamClick = async (teamData) => {
    console.log(teamData);
    const firstChatId = Object.keys(teamData.chats)[0];
    navigate(`/${teamData.id}/${firstChatId}`);
  };

  function handleFetchTeamsData(teamsIds) {
    getTeamsData(teamsIds).then((teamsData) => setTeamsData(teamsData));
  }

  useEffect(() => {
    const unsubscribe = subscribeToTeams(user.uid, handleFetchTeamsData);
    if (userData?.teams) {
      handleFetchTeamsData(Object.keys(userData.teams));
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
        {teamsData &&
          teamsData.map((team) => {
            console.log("team data", team);
            return (
              <Avatar
                handleClick={() => handleTeamClick(team)}
                key={team.id}
                tooltip={team.details.name}
                imageUrl={team.details?.imageUrl || defaultTeam}
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
