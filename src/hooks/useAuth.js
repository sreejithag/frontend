import React, { useState, createContext, useContext } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const localStorageValue = JSON.parse(localStorage.getItem("loggedIn"));
  const [loggedIn, setLoggedIn] = useState(localStorageValue);

  const login = async (username, password) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/login`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        return true;
      }
      return false;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const url = `${process.env.REACT_APP_API_BASE_URL}/logout`;
    const response = await fetch(url, {
      method: "GET",
      headers: token !== null && token !== "" ? headers : undefined,
    });

    if (response.status === 200) {
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("token", "");
      return true;
    }

    return false;
  };

  const setToken = (token) => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, logout, login, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
