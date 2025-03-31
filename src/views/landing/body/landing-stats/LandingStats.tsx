//CSS
import "./LandingStats.css";

//Components
import StatCircle from "./stat-circle/StatCircle";

function LandingStats() {
  const users = 30232;
  const teams = 12;
  return (
    <div className="landing-stats">
      <StatCircle>
        {
          <>
            <span>{users}</span>
            <span>Users</span>
          </>
        }
      </StatCircle>
      <StatCircle>
        {
          <>
            <span>{teams}</span>
            <span>Teams</span>
          </>
        }
      </StatCircle>
    </div>
  );
}

export default LandingStats;
