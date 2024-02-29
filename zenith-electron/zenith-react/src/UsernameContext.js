import React, { createContext, useState, useContext } from 'react';

const UsernameContext = createContext();

export const useUsername = () => useContext(UsernameContext);

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('FlyTech Co.');

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};