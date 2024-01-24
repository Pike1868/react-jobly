import React, { createContext, useState, useContext, useEffect } from "react";
import JoblyApi from "../api/JoblyApi";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

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

  useEffect(() => {
    // Fetch user details when user is available
    if (user) {
      async function fetchUserData() {
        try {
          const response = await JoblyApi.getUser(user.username);
          setUserDetails(response.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      fetchUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userDetails, setUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
