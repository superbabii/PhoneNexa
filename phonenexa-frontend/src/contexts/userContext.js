import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    axios
      .get('user/profile', {withCredentials: true})
      .then(({ data }) => {
        setUserName(data.userName);
        setUserId(data.userId);
        setPicture(data.picture);
      })
      .catch((error) => console.log(error));
  }, []);

  const value = { userName, setUserName, userId, setUserId, picture, setPicture };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
};
