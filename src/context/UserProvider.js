import { createContext, useState } from "react";

const UserProvider = (props) => {
  const [login, setLogin] = useState({
    name: "",
    id: "",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const UserContext = createContext();
