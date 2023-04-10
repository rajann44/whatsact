import { getDocs, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { messagesReference } from "../firebase/FirebaseApp";

const GroupProvider = (props) => {
  const [group, setGroup] = useState({
    name: "",
    id: "",
    members: "",
  });
  const [groupMessagesList, setGroupMessagesList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});

  const populateGroupsDetail = (groupData) => {
    setGroup(groupData);
  };

  const setSelecedGroup = (groupDetails) => {
    setSelectedGroup(groupDetails);
    getAllMessagesFromGroup(groupDetails.id);
  };

  const getAllMessagesFromGroup = async (selectedID) => {
    setGroupMessagesList([]);
    let customQuery = query(
      messagesReference,
      where("groupid", "==", selectedID)
    );
    const queryResult = await getDocs(customQuery);
    queryResult.forEach((query) => {
      console.log(query.data());
      setGroupMessagesList((previous) => [...previous, query.data()]);
    });
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        populateGroupsDetail,
        selectedGroup,
        setSelecedGroup,
        groupMessagesList,
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;
export const GroupContext = createContext();
