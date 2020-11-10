import React from "react";

import "./chat-item.styles.scss";

function ChatItem({ chat, currentUser, selectChat, selectedChat }) {
  const { users, messages, receiverHasRead } = chat;

  const getOtherChatUser = () =>
    users.filter((user) => user !== currentUser.email)[0];

  const getLastMessage = () => messages[messages.length - 1];

  return (
    <div
      className={`${
        chat.id === selectedChat ? "selected-chat" : ""
      } chat-item-container`}
      onClick={() => selectChat(chat.id)}
    >
      <div
        className="profile-pic-holder"
        style={{
          backgroundColor: `#6b29${getOtherChatUser().length + 80}`,
        }}
      >
        <p>{getOtherChatUser().substring(0, 1)}</p>
      </div>
      <div className="chat-info">
        <p className="chat-user">{getOtherChatUser()}</p>
        <p className='chat-text'>{getLastMessage().message.substring(0, 30)}</p>
      </div>
      {!receiverHasRead && getLastMessage().sender !== currentUser.email && (
        <div>
          <img
            src={"https://static.thenounproject.com/png/1793799-200.png"}
            className="bell-icon"
            alt="notification"
          />
          <div className="bell-notification"></div>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
