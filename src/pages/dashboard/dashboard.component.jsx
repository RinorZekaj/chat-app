import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ChatView from "../../components/chat-view/chat-view.component";
import ChatsOverview from "../../components/chats-overview/chats-overview.component";
import NewChatForm from "../../components/new-chat-form/new-chat-form.component";
import { auth, firestore } from "../../firebase/firebase.utils";

import "./dashboard.styles.scss";

function Dashboard(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);

  let unsubcribeFromAuth = null;

  useEffect(() => {
    unsubcribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { email, uid } = user;
        setCurrentUser({
          email,
          uid,
        });

        await firestore
          .collection("chats")
          .where("users", "array-contains", user.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(chats);
            setChats(chats);
          });
      } else {
        // props.history.push("/signup");
      }
    });
    return () => {
      unsubcribeFromAuth();
    };
  }, []);

  const selectChatHandler = (id) => {
    console.log(id);
    setSelectedChat(id);
    setNewChatFormVisible(false);
    firestore.collection("chats").doc(id).update({
      receiverHasRead: true,
    });
  };

  const newChatHandler = () => {
    setSelectedChat(null);
    setNewChatFormVisible(true);
  };

  const createNewChatHandler = (e, email, message) => {
    e.preventDefault();

    const docKey = [email, currentUser.email].sort().join(":");

    console.log({ email, message });
    firestore.collection("chats").doc(docKey).set({
      users: [email, currentUser.email],
      messages: [{
        sender: currentUser.email,
        message
      }],
      receiverHasRead: false
    })
  };

  return (
    <div className="dashboard-container">
      <ChatsOverview
        chats={chats}
        currentUser={currentUser}
        selectChat={selectChatHandler}
        newChat={newChatHandler}
        currentChatSelected={selectedChat}
      />
      {selectedChat && !newChatFormVisible ? (
        <ChatView
          currentChat={chats.filter((chat) => chat.id === selectedChat)[0]}
          currentUser={currentUser}
        />
      ) : (
        <NewChatForm createChatHandler={createNewChatHandler} />
      )}
    </div>
  );
}

export default withRouter(Dashboard);
