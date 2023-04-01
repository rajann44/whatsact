import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { usersReference } from "../../firebase/FirebaseApp";
import userProfile from "../../img/unknown.jpeg";

const LeftNav = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [userList, setUserList] = useState([]);

  const handleMouseEnter = (index) => {
    console.log("Mouse Enter");
    setHoverIndex(index);
  };
  const handleMouseLeave = () => {
    console.log("Mouse Leave");
    setHoverIndex(null);
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
      {userList.map((user, index) => {
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
