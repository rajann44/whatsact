import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import ChatHome from "./components/chat/ChatHome";
import Group from "./components/Group";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import GroupProvider from "./context/GroupProvider";
import UserProvider from "./context/UserProvider";

const Appstate = createContext();

function App() {
  return (
    <UserProvider>
      <GroupProvider>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/chat" element={<ChatHome></ChatHome>}></Route>
            <Route path="/group" element={<Group></Group>}></Route>
          </Routes>
        </div>
      </GroupProvider>
    </UserProvider>
  );
}

export default App;
export { Appstate };
