import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Send, X } from "lucide-react"
import { useQuery} from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

export default function Messenger({friendChat,handleToggleFalse}) {
  const server = "http://localhost:5000/";
  const [message, setMessage] = useState("")
  const scrollAreaRef = useRef(null)
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const sender = tokenData.userId;
  const receiverId  = friendChat._id;



 // handle time
 function formatTimestampToDayAndTime(timestamp) {
  const date = new Date(timestamp);

  // Array of day names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dayName = days[date.getUTCDay()]; // Get the day name in UTC
  const hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC

  // Format the time
  return `${dayName} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Pad minutes with leading zero if necessary
}
 //POST DATA
 const HandleMessages = async (e)=> {
  e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/Messenger", {
      sender,
      receiverId,
      message,
      }, 
      {headers: {
         Authorization: `Bearer ${token}` 
      }});
      if (res){
        setMessage("")
        refetch()
        console.log(res)
      }}
    catch (error) {
       console.error("Error:", error);
   }
    };

  // FETCH DATA
const { data: messages = null, refetch, isError, error } = useQuery({
  queryKey: ['messages', receiverId], // Use an array for the query key
  queryFn: async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/get/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (err) {
      console.error("Error fetching messages:", err);
      throw err; // This will trigger isError and pass the error to React Query's error handling
    }
  },
  cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
  staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
});

  return (
    <div className="w-[300px] h-[350px] top-[50px] bg-[#18191A]  border border-gray-700 rounded-t-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-800 ">
       <div className="flex items-center gap-3">
       <img className="w-[35px] h-[35px] rounded-full" src={server + friendChat.image} alt="ss" />
       <h3 className="font-semibold text-red-500">{friendChat.username}</h3>
       </div> 
        <button
          onClick={handleToggleFalse}
          className="text-red-700 hover:text-red-900 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3" ref={scrollAreaRef}>
        {messages && messages.map((message) => (
          <div
            key={message._id}
            className={`mb-2 ${
              message.sender === sender ? "text-right" : "text-left"
            }`}
          >           
            <span className="text-gray-500 text-[11px]">{formatTimestampToDayAndTime(message.timestamp)}</span>  
            <div className="flex items-center justify-end gap-2"> 
            </div>
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === sender
                  ? "bg-red-900 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.content}  
            </span>
          </div>
        ))}
      </div>
      <form  className="p-3 border-t border-gray-700 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2 px-3 py-2 bg-gray-800 border border-red-900 placeholder-red-900 rounded-md text-red-500 focus:outline-none focus:ring-1 focus:ring-red-900"
        />
        <button
        onClick={HandleMessages}
          type="submit"
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-900 "
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
// Define prop types for validation
Messenger.propTypes = {
  friendChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleToggleFalse: PropTypes.func.isRequired,
};