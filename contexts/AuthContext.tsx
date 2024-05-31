import { getUsers } from "@/actions";
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    const users = await getUsers();
    if (users.length > 0) {
      const user = users.find((u: User) => u.email === email);
      if (user) {
        setUser(user);
      } else {
        throw new Error("User not found");
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
