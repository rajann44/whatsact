import {
  addDoc,
  and,
  getDocs,
  or,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../../App";
import { messagesReference } from "../../firebase/FirebaseApp";

const RightChatPage = () => {
  const [messageInput, setMessageInput] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const useAppstate = useContext(Appstate);

  useEffect(
    () => {
      console.log(messageInput);

      setMessagesList([]);
      const getMessagesData = async () => {
        setSpinner(true);
        console.log("Spinner: " + spinner);
        let customQuery = query(
          messagesReference,
          (where("sender", "==", useAppstate.loginUserId),
          where("receiver", "==", useAppstate.openChatUserId))
        );
        const queryResult = await getDocs(customQuery);
        console.log(queryResult);
        queryResult.forEach((query) => {
          console.log(query.data());
          setMessagesList((previous) => [...previous, query.data()]);
        });
        setSpinner(false);
      };
      getMessagesData();
    },
    [useAppstate],
    [spinner]
  );

  const handleSendMessage = async () => {
    try {
      const ts = new Date().getTime();
      await addDoc(messagesReference, {
        createdAt: new Date(ts).toLocaleString(),
        sender: useAppstate.loginUserId,
        receiver: useAppstate.openChatUserId,
        text: messageInput,
      });
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
        Username: {useAppstate.openChatUserName}
      </div>
      {spinner ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        ""
      )}
      {messagesList.length == 0
        ? "Lol! So sad No messages yet!"
        : messagesList.map((message, index) => {
            return (
              <ul className="list-group" key={index}>
                <li
                  className="list-group-item my-1"
                  style={{
                    background: `${
                      message.sender == useAppstate.loginUserId ? "#dcf8c6" : ""
                    }`,
                  }}
                >
                  {message.text}
                </li>
              </ul>
            );
          })}
      <div className="input-group mb-3 my-5">
        <input
          type="text"
          className="form-control"
          placeholder="Send Message"
          onChange={(e) => setMessageInput(e.target.value)}
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
