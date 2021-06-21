import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import axios from "./axios";
import Pusher from "pusher-js";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  const getChats = () => {
      axios.get('/get/conversationList').then((res) => {
          setChats(res.data);
      })
  }

  useEffect(() => {
      Pusher.unsubscribe('messages');

      getChats();
  }, []);

  const addChat = () => {
    const chatName = prompt("Please enter a chat name");
    // otherwise it will make the whole build super complicated
    const firstMsg = prompt("Please send a welcome message");

        if(chatName && firstMsg) {
            let chatId = '';

            axios.post('/new/conversation', {
                chatName: chatName
            }).then((res) => {
                // storing the id
                chatId = res.data._id
            }).then(() => {
                // adding the message to the exact chat ID
                axios.post(`/new/message?id=${chatId}`, {
                    message: firstMsg,
                    timestamp: Date.now(),
                    user: user,
                })
            })
        }
  };


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>

        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlinedIcon onClick={addChat} />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, name, timestamp }) => (
          <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
