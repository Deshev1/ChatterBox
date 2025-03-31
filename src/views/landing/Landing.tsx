//CSS
import "./Landing.css";

//Components
import Header from "./header/Header";
import LandingBody from "./body/LandingBody";

function Landing() {
  return (
    <div className="landing">
      <Header />
      <LandingBody />
    </div>
  );
}

export default Landing;
