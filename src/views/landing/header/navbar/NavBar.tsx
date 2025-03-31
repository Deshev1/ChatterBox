//CSS
import "./NavBar.css";

//Dependency
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to={"/register"}>register</NavLink>
      <NavLink to={"/login"}>login</NavLink>
      <NavLink to={"/about"}>about</NavLink>
    </nav>
  );
}

export default NavBar;
