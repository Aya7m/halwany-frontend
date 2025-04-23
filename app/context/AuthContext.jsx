"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // ✅

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("karfora-user");
      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      }
      setIsAuthChecked(true); // ✅
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
