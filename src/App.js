import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChatHome from "./components/chat/ChatHome";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import GroupProvider from "./context/GroupProvider";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [openChatUserId, setOpenChatUserId] = useState(null);
  const [openChatUserName, setOpenChatUserName] = useState(null);
  const [loginUserId, setLoginUserId] = useState(null);
  const [loginUserName, setLoginUserName] = useState(null);

  return (
    <GroupProvider>
      <Appstate.Provider
        value={{
          login,
          setLogin,
          openChatUserId,
          setOpenChatUserId,
          loginUserId,
          setLoginUserId,
          loginUserName,
          setLoginUserName,
          openChatUserName,
          setOpenChatUserName,
        }}
      >
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/chat" element={<ChatHome></ChatHome>}></Route>
          </Routes>
        </div>
      </Appstate.Provider>
    </GroupProvider>
  );
}

export default App;
export { Appstate };
