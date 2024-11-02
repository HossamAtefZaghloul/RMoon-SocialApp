import { useState, useEffect } from "react";
import { Search, User, Loader, UserPlus, X, UserCheck } from "lucide-react";
import axios from "axios";
import useFetch from "../customHooks/UseFetch.jsx";
import jwt_decode from "jwt-decode";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [addUserStates, setAddUserStates] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [userB, setUserB] = useState("");
  const limit = 4; // Maximum search results
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const userA = tokenData.userId;
  
  const handleAdd = (UserB_id) => {
    setUserB(UserB_id);
  };

  useEffect(() => {
    if (!userB) return;

    const sendFriendRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/friendrequest", {
          userA,
          userB,
        });
        console.log("Friend request sent:", res);
      } catch (e) {
        console.log("Error sending friend request:", e);
      }
    };

    sendFriendRequest();
  }, [userB]);

  const { data, isLoading, error } = useFetch(
    "http://localhost:5000/api/users",
    token
  );

  useEffect(() => {
    if (data) {
      const result = data
        .filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, limit);
      setFilteredData(query ? result : []);
    }
  }, [data, query]);

  const toggleAddUserState = (userId) => {
    setAddUserStates((prevStates) => ({
      ...prevStates,
      [userId]: !prevStates[userId],
    }));
  };

  return (
    <div className="z-[9999999] w-full">
      <div className="relative m-3 rounded-full text-gray-400 hover:text-gray-500">
        <label className="sr-only" htmlFor="user-search">
          Search users
        </label>
        <input
          id="user-search"
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-[#242526] w-full h-8 px-4 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
          aria-label="Search users"
        />
        {query ? (
          <X
            onClick={() => setQuery("")}
            className="cursor-pointer text-red-700 h-4 w-4 absolute right-3 top-2"
          />
        ) : (
          <Search className="cursor-pointer text-red-700 h-4 w-4 absolute right-2 top-2" />
        )}
      </div>
      {isLoading && query && (
        <div className="flex items-center justify-center text-red-500">
          <Loader className="animate-spin h-5 w-5" />
          <span>Loading...</span>
        </div>
      )}
      {error && query && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!isLoading && !error && filteredData.length > 0 && (
        <ul className="space-y-2">
          {filteredData.map((user) => (
            <li key={user._id} className="bg-[#18191A] shadow rounded-lg p-4 flex items-center z-50 border border-gray-700">
            <div className="flex gap-2 items-center">
              <img className="w-9 h-9 sm:w-[50px] rounded-full p-1 text-red-800 " src={`http://localhost:5000/${user.image}`} alt="" />  
                <div>
                  <p className="font-medium text-white">{user.username}</p>
                  <p className="text-sm font-medium text-gray-500">{user.email.length > 9 ? user.email.slice(0, 9) + "..." : user.email}</p>
                </div>
            </div>
              {addUserStates[user._id] ? (
                <div className="flex justify-end w-full  text-red-700">
                  <button onClick={() => toggleAddUserState(user._id)}>
                    <UserCheck />
                  </button>
                </div>
              ) : (
                <div className="flex justify-end w-full text-red-700">
                  <button
                    onClick={() => {
                      handleAdd(user._id);
                      toggleAddUserState(user._id);
                    }}
                  >
                    <UserPlus />
                    
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
   
    </div>
  );
}
