import React from "react";
import LeftNav from "./LeftNav";
import RightChatPage from "./RightChatPage";

const ChatHome = () => {
  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col border-end">
            <LeftNav />
          </div>
          <div className="col-8">
            <RightChatPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
