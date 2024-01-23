import React, { createContext, useState, useContext, useEffect } from "react";
import JoblyApi from "../api/JoblyApi";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("joblyToken");
    if (storedToken) {
      JoblyApi.token = storedToken;
      const decoded = jwtDecode(storedToken);
      if (decoded) {
        setUser({ username: decoded.username, isAdmin: decoded.isAdmin });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
