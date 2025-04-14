//Dependency
import { useState, createContext, useEffect } from "react";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

//Services
import { subscribeToStatus } from "../services/user.service";
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

  useEffect(() => {
    if (!appState.user || !appState.userData) return;

    const unsubscribe = subscribeToStatus(user.uid, (statusFromFirebase) => {
      setAppState((prev) => {
        return {
          ...prev,
          userData: {
            ...prev.userData,
            details: {
              ...prev.userData.details,
              status: statusFromFirebase,
            },
          },
        };
      });

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...appState.userData,
          details: {
            ...appState.userData.details,
            status: statusFromFirebase,
          },
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, [appState.user]);

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
