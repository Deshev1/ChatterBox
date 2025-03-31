//CSS
import "./Header.css";

//Components
import Logo from "../../../components/logo/Logo";
import NavBar from "./navbar/NavBar";

function Header() {
  return (
    <div className="header">
      <Logo
        text={"chatterbox"}
        color={"white"}
      />
      <NavBar />
    </div>
  );
}

export default Header;
