import React from "react";

const Group = () => {
  //Search and select user (logged in user should already be present in group)
  //Create group with selected + Logged in user (pass users in array)

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
          placeholder="Unique group name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Search Members to Add
        </label>
        <input type="text" className="form-control" placeholder="search user" />
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-success col-md-3 mx-auto text-center"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Group;
