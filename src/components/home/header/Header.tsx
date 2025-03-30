//CSS
import "./Header.css";
import NavBar from "./nav-bar/NavBar";

//Components
import Logo from "./logo/Logo";

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
