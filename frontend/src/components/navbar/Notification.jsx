import { useState, useEffect } from "react";
import { Bell, UserCheck, UserX } from "lucide-react";
import useFetch from "../customHooks/UseFetch.jsx";
import axios from 'axios';

const Notification = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userB, setUserB] = useState([]);
  const server = "http://localhost:5000/";
  const token = localStorage.getItem("token");

  const { data } = useFetch("http://localhost:5000/getfriends", token);

  useEffect(() => {
    if (data) {
      setUserB(data);
    }
  }, [data]);

  const handleSubmit = async (requestId) => {
    try {
      await axios.post("http://localhost:5000/api/accept_fiends", {
        friendRequestID: requestId
      });
      setUserB(prev => prev.filter(user => user._id !== requestId));
      setNotificationsOpen(false); // Close notifications after accepting
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={() => setNotificationsOpen(!notificationsOpen)}
        type="button"
        className={`m-3 flex-shrink-0 p-2 rounded-full border-red-900 border-0 hover:bg-red-900 focus:outline-none ${notificationsOpen ? "bg-red-900" : ""}`}
      >
        <Bell className="text-white h-6 w-6" />
      </button>
      
      {notificationsOpen && (
        <div className="absolute top-[57px] right-0 w-[250px] bg-[#18191A] rounded-lg shadow-lg z-50">
          <ul className="space-y-0">
            {userB.map((user, index) => (
              <li key={index} className="bg-[#18191A] shadow p-4 flex items-center justify-between space-x-4 rounded-lg border border-red-900">
                <div className="flex items-center">
                  <img src={server + user.requester.image} alt="User" className="w-[33px] h-[33px] rounded-full" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-700">{user.requester.username}</p>
                    <p className="text-xs text-gray-500">{user.requester.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck onClick={() => handleSubmit(user._id)} className="text-red-700 cursor-pointer" />
                  <UserX onClick={() => setNotificationsOpen(false)} className="text-red-700 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
