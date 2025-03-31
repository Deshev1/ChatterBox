//CSS
import "./LandingBody.css";

//Components
import LandingInfo from "./landing-info/LandingInfo";
import LandingStats from "./landing-stats/LandingStats";

function LandingBody() {
  return (
    <div className="landing-body">
      <LandingInfo />
      <LandingStats />
    </div>
  );
}

export default LandingBody;
