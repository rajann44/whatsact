import { getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../../App";
import { usersReference } from "../../firebase/FirebaseApp";
import userProfile from "../../img/unknown.jpeg";

const LeftNav = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [userList, setUserList] = useState([]);
  const useAppstate = useContext(Appstate);

  const handleMouseEnter = (index) => {
    console.log("Mouse Enter");
    setHoverIndex(index);
  };
  const handleMouseLeave = () => {
    console.log("Mouse Leave");
    setHoverIndex(null);
  };
  const handleOnClick = (user) => {
    console.log("ClickedUserId: " + user.id);
    useAppstate.setOpenChatUserId(user.id);
    useAppstate.setOpenChatUserName(user.name);
  };

  useEffect(() => {
    setUserList([]);
    async function getData() {
      const userDoc = await getDocs(usersReference);
      userDoc.forEach((user) => {
        setUserList((prv) => [...prv, { ...user.data() }]);
        console.log(user.data());
      });
    }
    getData();
  }, []);

  return (
    <div className="userList">
      {userList
        .filter((person) => person.name != useAppstate.loginUserName)
        .map((user, index) => {
          return (
            <div
              key={index}
              style={
                index === hoverIndex
                  ? { backgroundColor: "#f3f4f7", cursor: "pointer" }
                  : {}
              }
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(0)}
              onClick={() => handleOnClick(user)}
            >
              <img
                src={userProfile}
                alt="Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-top"
              />
              <div className="border-bottom my-3">
                <h5>{user.name}</h5>
                <p>....Last seen few days ago</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftNav;
