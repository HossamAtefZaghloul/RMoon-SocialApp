import { useQuery } from "@tanstack/react-query";
import { useState, useEffect} from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";
import jwt_decode from "jwt-decode";
import "./rightbar.css";
import Messenger from "./Messenger";

export default function Rightbar() {
  const [query, setQuery] = useState("");
  const [friendChat, setFriendChat] = useState("");
  const [toggleChat, setToggleChat] = useState("");
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  //
  const userId = tokenData.userId;
  const handleToggleFalse = () => {
    setToggleChat(false);
  };
  //
  const fetchFriends = async () => {
    const response = await axios.get("http://localhost:5000/api/acceptedfriends", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  const { data: allFriends, isLoading, isError, refetch } = useQuery({
    queryKey: ["acceptedFriends", token],
    queryFn: () => fetchFriends(token),
    enabled: !!token,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    staleTime: 30000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading friends list.</p>;

  const filteredFriends = allFriends?.filter((friend) => {
    const friendUsername = friend.requester.username;
    return friendUsername.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="bg-[#18191A] flex flex-col w-full h-full border-l border-gray-700 p-6 relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search friends..."
          className="bg-[#242526] w-full pl-10 pr-4 py-2 border border-[#242526] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col space-y-2">
          {filteredFriends && filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              friend.status === "accepted" && (
                <li key={friend._id} className="px-4 py-2 hover:bg-gray-700 transition-colors duration-200 rounded-lg">
                  <div onClick={() => {
                    setFriendChat(friend.requester._id === userId ? friend.recipient : friend.requester);
                    setToggleChat(true)}}
                    className="flex items-center cursor-pointer">
                    <img
                      src={`http://localhost:5000/${friend.requester._id === userId ? friend.recipient.image : friend.requester.image}`}
                      alt={friend.requester.username}
                      className="w-[35px] h-[35px] rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-700">
                        {friend.requester._id === userId ? friend.recipient.username : friend.requester.username}
                      </p>
                      <p className="text-xs text-gray-500">Offline</p>
                    </div>
                  </div>
                </li>
              )
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No friends found.</li>
          )}
        </ul>
      </div>
      <div className="p-4 w-full border-t border-gray-700">
        <button
          className="flex sm:text-[11px] xs:text-[5px] items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          onClick={refetch}
        >
          <Users className="h-5 w-5 mr-1 sm:w-3 sm:h-3 xs:w-3 xs:h-3" />
          Find New Friends
        </button>
              </div>
              {toggleChat && (
              <div
            onClick={() => {
              setToggleChat(false);
            }}
            className="fixed inset-0 z-[999999] flex justify-end items-end right-[410px] bg-opacity-90 "
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Messenger 
              friendChat={friendChat}
              handleToggleFalse={handleToggleFalse}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
            </div>
  );
}
