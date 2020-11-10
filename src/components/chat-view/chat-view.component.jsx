import React, { useState, useEffect } from "react";
import firebase, { firestore } from "../../firebase/firebase.utils";

import "./chat-view.styles.scss";

function ChatView({ currentChat, currentUser }) {
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let chatContent = document.getElementById('chat-holder');
    chatContent.scrollTo(0, chatContent.scrollHeight)
  }, [])

  const getFriendInChat = () => {
    return currentChat.users.filter((user) => user !== currentUser)[0];
  };

  const validateMessage = (txt) => txt && txt.replace(/\s/g, "").length;

  const sendMessageHandler = () => {
    if (validateMessage(newMessage)) {
      firestore
        .collection("chats")
        .doc(currentChat.id)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            sender: currentUser.email,
            message: newMessage,
          }),
          receiverHasRead: false
        }).then(() => setNewMessage(''))
    }
  };

  const inputClickHandler = () => {
    firestore.collection("chats").doc(currentChat.id).update({
      receiverHasRead: true,
    });
  }

  return (
    <div className="chat-view-container">
      <div className="chat-header">
        <p>You are chating with: {getFriendInChat()}</p>
      </div>

      <div className="messages-holder" id='chat-holder'>
        {currentChat.messages.map((message) => (
          <div
            className={`${
              message.sender === currentUser.email
                ? "chat-from-us"
                : "chat-from-friend"
            }`}
            key={message.message}
          >
            <span>{message.message}</span>
          </div>
        ))}
      </div>

      <div className="input-holder">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message"
          className="send-input"
          onClick={inputClickHandler}
        />
        <button className="send-button" onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatView;
