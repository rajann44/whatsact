import { addDoc, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { groupsReference, usersReference } from "../firebase/FirebaseApp";

const Group = () => {
  const [groupInfo, setGroupInfo] = useState({
    id: Math.random().toString(36).slice(2),
    name: "",
    members: [],
  });

  const { login } = useContext(UserContext);

  const [searchEmail, setSearchEmail] = useState();
  const [searchResult, setSearchResult] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState("white");
  const handleClickColor = () => {
    setBackgroundColor("yellow");
  };

  useEffect(() => {
    setGroupInfo({
      ...groupInfo,
      members: [...groupInfo.members, login.id],
    });
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
      await addDoc(groupsReference, groupInfo);
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
          onChange={(e) => setGroupInfo({ ...groupInfo, name: e.target.value })}
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
          className="row searchResult w-50"
          onClick={() =>
            setGroupInfo({
              ...groupInfo,
              members: [...groupInfo.members, searchResult.id],
            })
          }
        >
          <div style={{ backgroundColor }} className="col-md-8">
            {searchResult != null && searchResult.name}
          </div>
          {searchResult != null && (
            <div
              className="btn btn-warning mx-5 col-md-4"
              onClick={handleClickColor}
            >
              Add User!
            </div>
          )}
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
