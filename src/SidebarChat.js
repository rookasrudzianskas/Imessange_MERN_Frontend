import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./SidebarChat.css";
import * as timeago from "timeago.js";
import axios from "./axios";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  const [lastMsg, setLastMsg] = useState("");
  const [lastPhoto, setLastPhoto] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState("");


  // here we get the messages to display here
  const getSidebarElement = () => {
      axios.get(`/get/lastMessage?id=${id}`).then((res) => {
          setLastMsg(res.data.message);
          setLastPhoto(res.data.user.photo);
          setLastTimestamp(res.data.timestamp);
      });
  }

  useEffect(() => {
      getSidebarElement();

      // real times stuff
  }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
            {new Date(parseInt(lastTimestamp)).toUTCString()}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
