import { getUsers } from "@/actions";
import { IUser } from "@/models";
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AuthContextType {
  user: IUser | null;
  login: (username: string) => Promise<boolean | undefined>;
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
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string) => {
    const users = await getUsers();
    if (users.length > 0) {
      // const user = users.find((u: User) => u.email === email);
      const user = users[0];
      if (user) {
        setUser(user);
        return true;
      } else {
        return false;
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
