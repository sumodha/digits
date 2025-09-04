import { createContext, useState, useContext } from "react";

const UsernameContext = createContext();

export function UsernameProvider({ children }) {
  const [username, setUsername] = useState("guest");
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export function useUsername() {
  return useContext(UsernameContext);
}
