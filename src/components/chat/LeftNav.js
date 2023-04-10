import { groupsReference } from "../../firebase/FirebaseApp";
import React, { useContext, useEffect } from "react";
import userProfile from "../../img/unknown.jpeg";
import { getDocs } from "firebase/firestore";
import { GroupContext } from "../../context/GroupProvider";

const LeftNav = () => {
  const { group, populateGroupsDetail, setSelecedGroup } =
    useContext(GroupContext);

  useEffect(() => {
    populateGroupsDetail([]);
    async function getData() {
      const groupDoc = await getDocs(groupsReference);
      const newGroups = [];
      groupDoc.forEach((group) => {
        newGroups.push({ ...group.data() });
      });
      populateGroupsDetail(newGroups);
    }
    getData();
  }, []);

  const handleOnClick = (group) => {
    console.log("Clicked Group Name: " + group.name);
    setSelecedGroup(group);
  };

  return (
    <div className="userList">
      {group.length > 0 &&
        group.map((groupDetail, index) => {
          return (
            <div key={index}>
              <img
                src={userProfile}
                alt="Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-top"
              />
              <div
                className="border-bottom my-3"
                onClick={() => handleOnClick(groupDetail)}
              >
                <h5>{groupDetail.name}</h5>
                {groupDetail.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftNav;
