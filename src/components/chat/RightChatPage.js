import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { messagesReference } from "../../firebase/FirebaseApp";

const RightChatPage = () => {
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const getMessagesData = async () => {
      let customQuery = query(
        messagesReference,
        where("sender", "==", "qocxtn45d6j"),
        where("receiver", "==", "nsi41k213x")
      );
      const queryResult = await getDocs(customQuery);
      console.log(queryResult);
      queryResult.forEach((query) => {
        console.log(query.data());
        setMessagesList((previous) => [...previous, query.data()]);
      });
    };
    getMessagesData();
  }, []);

  return (
    <div>
      {messagesList.map((message, index) => {
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
        />
        <span className="input-group-text" id="basic-addon2">
          Send Now ➡️
        </span>
      </div>
    </div>
  );
};

export default RightChatPage;
