//Dependency
import { useState, createContext, useEffect } from "react";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

//Services
import { logoutUser } from "../services/auth.service";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {},
  handleLogout() {},
});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const storedUserData = localStorage.getItem("userData");

    return {
      user: null,
      userData: storedUserData ? JSON.parse(storedUserData) : null,
    };
  });

  const [user, loading] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState((prev) => {
      return { ...prev, user };
    });
  }

  async function handleLogout() {
    await logoutUser();
    setAppState({ user: null, userData: null });
    localStorage.removeItem("userData");
    await new Promise((resolve) => setTimeout(resolve, 0));
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
