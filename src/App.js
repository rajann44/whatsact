import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);

  return (
    <Appstate.Provider value={{ login, setLogin }}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
