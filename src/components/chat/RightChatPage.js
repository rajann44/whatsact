import { addDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef } from "react";
import { GroupContext } from "../../context/GroupProvider";
import { messagesReference } from "../../firebase/FirebaseApp";
import { Timestamp } from "@firebase/firestore";
import { UserContext } from "../../context/UserProvider";

const RightChatPage = () => {
  const { login } = useContext(UserContext);
  const { selectedGroup, groupMessagesList } = useContext(GroupContext);
  const messageInputRef = useRef();

  useEffect(() => {
    console.log("Hello Rajan I am right!");
  }, [groupMessagesList]);

  const handleSendMessage = async () => {
    try {
      await addDoc(messagesReference, {
        createdAt: Timestamp.fromDate(new Date()),
        senderID: login.id,
        text: messageInputRef.current.value,
        groupid: selectedGroup.id,
      });
      messageInputRef.current.value = "";
      console.log("Message sent!!");
    } catch (error) {
      console.log("Message not sent: " + error);
    }
  };

  return (
    <div className="my-3">
      <div
        className="chat-username p-3 text-white rounded-pill my-3"
        style={{ background: "#128c7e" }}
      >
        Groupname: {selectedGroup.name}
      </div>
      {groupMessagesList.length == 0
        ? "Lol! So sad No messages yet!"
        : groupMessagesList.map((message, index) => {
            return (
              <ul className="list-group" key={index}>
                <li
                  className="list-group-item my-1"
                  style={{
                    background: `${
                      message.senderID == login.id ? "#dcf8c6" : ""
                    }`,
                  }}
                >
                  {"Message From: " + message.senderID + " ==> " + message.text}
                </li>
              </ul>
            );
          })}
      <div className="input-group mb-3 my-5">
        <input
          type="text"
          ref={messageInputRef}
          className="form-control"
          placeholder="Send Message"
        />
        <button
          type="button"
          className="btn btn-success"
          id="basic-addon2"
          onClick={handleSendMessage}
        >
          Send Now {`>`}
        </button>
      </div>
    </div>
  );
};

export default RightChatPage;
