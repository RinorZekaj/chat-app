import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

import ChatItem from "../chat-item/chat-item.component";
import "./chats-overview.styles.scss";
import Logo from "../../assets/chat.svg";

function ChatsOverview({
  chats,
  currentUser,
  selectChat,
  newChat,
  currentChatSelected,
  history,
}) {
  const signOutHandler = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <div className="chats-overview-container">
      <div className="chat-logo-holder">
        <img src={Logo} alt="logo" />
        <p>QuickChat</p>
      </div>

      <button className="new-chat-btn" onClick={newChat}>
        New Chat
      </button>

      <p>
        Active Conversations <span className='chats-number'>{chats.length}</span>
      </p>
      {chats &&
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            currentUser={currentUser}
            selectChat={selectChat}
            selectedChat={currentChatSelected}
          />
        ))}

      <button className="logout-btn" onClick={signOutHandler}>
        LOGOUT
      </button>
    </div>
  );
}

export default withRouter(ChatsOverview);
