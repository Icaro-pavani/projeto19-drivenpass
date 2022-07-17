import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : { token: "" }
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
