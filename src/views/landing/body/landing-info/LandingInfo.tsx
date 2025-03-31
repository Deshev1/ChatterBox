//CSS
import "./LandingInfo.css";

//Components
import Button from "../../../../components/button/Button";

//Dependency
import { useNavigate } from "react-router-dom";

function LandingInfo() {
  const navigate = useNavigate();

  return (
    <div className="landing-info">
      <h1>The latest oldschool direct & group chat</h1>
      <p>
        We built this chat for all of you that wish to stay connected with no
        additional hassle. Simply create an account, add friends and chat away.
        Have a whole team behind you? We got you. Simply create a team and chat
        with all your friends together!
      </p>
      <div className="landing-btns">
        <Button handleClick={() => void navigate("/register")}>Join us!</Button>
        <Button
          handleClick={() => void navigate("/login")}
          variant={"outline"}
        >
          Log in.
        </Button>
      </div>
    </div>
  );
}

export default LandingInfo;
