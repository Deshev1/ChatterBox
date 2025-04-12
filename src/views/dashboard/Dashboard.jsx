//CSS
import "./Dashboard.css";

//Dependencies
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Components
import { AppContext } from "../../context/AppContext";
import TeamsBar from "./teams-bar/TeamsBar";
import Button from "../../components/button/Button";

function Dashboard() {
  const { user, userData, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="app-container">
      <TeamsBar />
      {/* <ChatsBar /> */}
      {/* <h1>{`Hello ${userData?.details.username}`}</h1>
      <Button handleClick={handleLogout}>Logout</Button> */}
    </div>
  );
}

export default Dashboard;
