//CSS
import "./App.css";

//Components
import AllRoutes from "./routes/Routes";

//Dependency
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { loading } = useContext(AppContext);

  if (loading) return <p>loading</p>;

  return <AllRoutes />;
}

export default App;
