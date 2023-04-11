import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";
import { groupsReference, usersReference } from "../firebase/FirebaseApp";

const Group = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const handleClickColor = () => {
    setBackgroundColor("yellow");
  };

  //Search and select user (logged in user should already be present in group)
  //Create group with selected + Logged in user (pass users in array)

  const useAppstate = useContext(Appstate);

  const [searchEmail, setSearchEmail] = useState();

  const [groupMembersList, setGroupMembersList] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const [groupName, setGroupName] = useState();

  useEffect(() => {
    setGroupMembersList((oldArray) => [...oldArray, useAppstate.loginUserId]);
  }, []);

  const handleMemberSearch = async (event) => {
    event.preventDefault();
    const queryResult = query(
      usersReference,
      where("email", "==", searchEmail)
    );
    const userDocument = await getDocs(queryResult);
    userDocument.forEach((singleUserDoc) => {
      const dataFromDoc = singleUserDoc.data();
      setSearchResult(dataFromDoc);
    });
  };

  const createGroup = async () => {
    try {
      await addDoc(groupsReference, {
        id: Math.random().toString(36).slice(2),
        name: groupName,
        members: groupMembersList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-50 p-5" style={{ backgroundColor: "#dcf8c6" }}>
      <h4 className="text-center">Create a group</h4>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Group Name
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter group name"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Search Members to Add
        </label>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={(e) => handleMemberSearch(e)}
          >
            Search
          </button>
        </form>
        <div
          className="searchResult"
          onClick={() =>
            setGroupMembersList((oldArray) => [...oldArray, searchResult.id])
          }
        >
          <div style={{ backgroundColor }} onClick={handleClickColor}>
            {searchResult != null && searchResult.name}
          </div>
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-success col-md-3 mx-auto text-center"
          onClick={createGroup}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Group;
