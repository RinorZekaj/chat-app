import React, { useState } from "react";

import "./new-chat-form.styles.scss";

function NewChatForm({ createChatHandler }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const newChat = (e) => {
    e.preventDefault();

    createChatHandler(e, email, message);
  };

  return (
    <div className="new-chat-container">
      <p className="title">Create new chat</p>
      <form className="new-chat-form" onSubmit={newChat}>
        <input
          className='new-chat-input'
          type="email"
          placeholder="Enter your friends email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='new-chat-input'
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Send" className='new-chat-submit' />
      </form>
    </div>
  );
}

export default NewChatForm;
