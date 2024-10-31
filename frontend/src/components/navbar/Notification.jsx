import { useState, useEffect } from "react";
import { Bell, UserCheck, UserX } from "lucide-react";
import useFetch from "../customHooks/UseFetch.jsx";
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState(false);
  const [userB, setUserB] = useState([]);
  const server = "http://localhost:5000/";
  const token = localStorage.getItem("token");
  const [res, setRes] = useState('');

  // GetUserFriends
  const { data } = useFetch("http://localhost:5000/getfriends", token);

  useEffect(() => {
    if (data) {
      setUserB(data);
    }
  }, [data]);

  const handleSubmit = async (requestId) => {
    // console.log(requestId)
    try {
      const res = await axios.post("http://localhost:5000/api/accept_fiends", {
        friendRequestID: requestId
      });
      console.log("Friend request Accepted:", res);
      setRes(res);
      setUserB((prevUserB) => prevUserB.filter((user) => user._id !== requestId));
      setNotifications(!notifications);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => {
          setNotifications(!notifications);
        }}
        type="button"
        className={`m-3 flex-shrink-0 p-2 rounded-full border-red-900 border-0 hover:bg-red-900 focus:outline-none ${
          notifications && "bg-red-900"
        } focus:ring-[#101011] `}
      >
        <span className=" absolute top-0 m-2 rounded-full  text-red-500">{}</span>
        <Bell className="text-white h-6 w-6" />
      </button> 
      {notifications && (
        <div className="absolute top-[57px] w-[250px] h-auto bg-[#18191A] bg-opacity-0 rounded-lg">
          <div className="w-auto">
            {userB && (
              <ul className="space-y-0">
                {userB.map((user, index) => (
                  <li
                    key={index}
                    className="bg-[#18191A] shadow p-4 m-0 flex items-center justify-between space-x-4 z-50 rounded-lg border border-red-900"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={server + user.requester.image}
                          alt="img"
                          className="w-[33px] h-[33px] rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-700">
                          {user.requester.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.requester.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck
                        onClick={() => handleSubmit(user._id)}
                        className="text-red-700 cursor-pointer"
                      />
                      <UserX onClick={() => {
                          setNotifications(!notifications);
                        }} className="text-red-700 cursor-pointer" />
                          
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
