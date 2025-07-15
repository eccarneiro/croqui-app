import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axios";
import { AuthContextData, User } from "../types";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    setUser({ ...res.data.user });
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return res;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
