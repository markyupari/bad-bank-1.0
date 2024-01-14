import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ email: "" });

  const updateCurrentUser = (newCurrentUser) => {
    setCurrentUser(newCurrentUser);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
