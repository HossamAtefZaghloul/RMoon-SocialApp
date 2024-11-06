import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

function formatTimestampToDayAndTime(timestamp) {
  const date = new Date(timestamp);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[date.getUTCDay()];
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${dayName} ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
export default function Messenger({ friendChat, handleToggleFalse }) {
  const server = "http://localhost:5000/";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollContainerRef = useRef(null);
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const sender = tokenData.userId;
  const receiverId = friendChat._id;

  // scroll
  useEffect(() => {
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      sender,
      receiverId,
      message,
    };

    try {
      socket.emit("sendMessage", newMessage);
      setMessage("");
      refetch();
    } catch (error) {
      console.error("Error sending message via Socket.IO:", error);

      // Fallback to the Axios request in case of Socket.IO error
      try {
        await axios.post("http://localhost:5000/Messenger", newMessage, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("");
      } catch (fallbackError) {
        console.error("Error sending message via HTTP:", fallbackError);
      }
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", sender);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [receiverId]);

  const { refetch } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/messages/${receiverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data); // Initial load of messages
        return res.data;
      } catch (err) {
        console.error("Error fetching messages:", err);
        throw err;
      }
    },
  });

  return (
    <div className="w-[300px] h-[350px] top-[50px] bg-[#18191A] border border-gray-700 rounded-t-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            className="w-[35px] h-[35px] rounded-full"
            src={server + friendChat.image}
            alt="Profile"
          />
          <h3 className="font-semibold text-red-500">{friendChat.username}</h3>
        </div>
        <button
          onClick={handleToggleFalse}
          className="text-red-700 hover:text-red-900 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3" ref={scrollContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 ${
              msg.sender === sender ? "text-right" : "text-left"
            }`}
          >
            <span className="text-gray-500 text-[11px]">
              {formatTimestampToDayAndTime(msg.timestamp)}
            </span>
            <div className="flex items-center justify-end gap-2"></div>
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === sender
                  ? "bg-red-900 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div />
      </div>
      <form
        className="p-3 border-t border-gray-700 flex"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2 px-3 py-2 bg-gray-800 border border-red-900 placeholder-red-900 rounded-md text-red-500 focus:outline-none focus:ring-1 focus:ring-red-900"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-900"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

Messenger.propTypes = {
  friendChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleToggleFalse: PropTypes.func.isRequired,
};
