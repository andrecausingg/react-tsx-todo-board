import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  status: string;
  setAuthenticated: () => void;
  setGuest: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("routeLocalStorage");
      return stored || "guest";
    }
    return "guest";
  });

  const updateStatus = (newValue: string) => {
    localStorage.setItem("routeLocalStorage", newValue);
    setStatus(newValue);
  };

  const setAuthenticated = () => updateStatus("authenticated");
  const setGuest = () => updateStatus("guest");

  return (
    <AuthContext.Provider value={{ status, setAuthenticated, setGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
