import { addDoc, getDocs, or, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../../App";
import { messagesReference } from "../../firebase/FirebaseApp";

const RightChatPage = () => {
  const [messageInput, setMessageInput] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const useAppstate = useContext(Appstate);

  useEffect(() => {
    console.log(messageInput);
    setMessagesList([]);
    const getMessagesData = async () => {
      let customQuery = query(
        messagesReference,
        or(
          where("sender", "==", useAppstate.loginUserId),
          where("receiver", "==", useAppstate.openChatUserId)
        )
      );

      const queryResult = await getDocs(customQuery);
      console.log(queryResult);
      queryResult.forEach((query) => {
        console.log(query.data());
        setMessagesList((previous) => [...previous, query.data()]);
      });
    };
    getMessagesData();
  }, [useAppstate]);

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
    <div>
      {messagesList.length == 0
        ? "Lol! So sad No messages yet!"
        : messagesList.map((message, index) => {
            return (
              <ul className="list-group" key={index}>
                <li className="list-group-item">{message.text}</li>
              </ul>
            );
          })}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Send Message"
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <span
          className="input-group-text"
          id="basic-addon2"
          onClick={handleSendMessage}
        >
          Send Now ➡️
        </span>
      </div>
    </div>
  );
};

export default RightChatPage;
