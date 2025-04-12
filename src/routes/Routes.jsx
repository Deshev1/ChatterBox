//Dependency
import { Routes, Route } from "react-router-dom";

//Components
import Home from "../views/landing/Landing";
import Register from "../views/register/Register";
import Login from "../views/login/Login";
import Dashboard from "../views/dashboard/Dashboard";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      ></Route>
      <Route
        path="/register"
        element={<Register />}
      ></Route>
      <Route
        path="/login"
        element={<Login />}
      ></Route>
      <Route
        path="/about"
        element={<Home />}
      ></Route>
      <Route
        path="/dashboard"
        element={<Dashboard />}
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
