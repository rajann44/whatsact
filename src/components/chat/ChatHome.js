import React, { useContext } from "react";
import { Appstate } from "../../App";
import LeftNav from "./LeftNav";
import RightChatPage from "./RightChatPage";

const ChatHome = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div>
      {useAppstate.login ? (
        <div className="container my-3">
          <div className="row">
            <div className="col border-end">
              <LeftNav />
            </div>
            <div className="col-9" style={{ background: "#ece5dd" }}>
              <RightChatPage />
            </div>
          </div>
        </div>
      ) : (
        "Please Login"
      )}
    </div>
  );
};

export default ChatHome;
