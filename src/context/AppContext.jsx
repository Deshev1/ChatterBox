//Dependency
import { useState, createContext } from "react";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { logoutUser } from "../services/auth.service";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {},
  handleLogout() {},
});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user, loading] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ user });
  }

  function handleLogout() {
    logoutUser().then(() => {
      setAppState({ user: null, userData: null });
    });
  }

  return (
    <AppContext
      value={{
        user: appState.user,
        userData: appState.userData,
        loading,
        setContext: setAppState,
        handleLogout,
      }}
    >
      {children}
    </AppContext>
  );
}

// type appState = {
//   user: User | undefined | null;
//   userData?: User | undefined | null;
// };
