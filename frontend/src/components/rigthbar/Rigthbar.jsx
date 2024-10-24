import { useState } from "react";
import { Search, Users } from "lucide-react";

export default function Rigthbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock friend data
  const friends = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "../../.././assets/person/7.jpeg",
      isOnline: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "../../.././assets/person/5.webp",
      isOnline: false,
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "../../.././assets/person/8.jpg",
      isOnline: true,
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "../../.././assets/person/4.png",
      isOnline: false,
    },
    {
      id: 5,
      name: "Ethan Hunt",
      avatar: "../../.././assets/person/1.jpg",
      isOnline: true,
    },
  ];

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" ||
        (filter === "online" && friend.isOnline) ||
        (filter === "offline" && !friend.isOnline))
  );

  return (
    <div className="bg-[#18191A] flex flex-col border-l border-gray-700 sticky h-[calc(100vh-58px)] top-[58px] ">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Friends</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search friends..."
            className=" bg-[#242526] w-full pl-10 pr-4 py-2 border border-[#242526] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="px-4 mb-4">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "all"
                ? "bg-red-600 text-white"
                : "bg-[#242526] text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "online"
                ? "bg-red-600 text-white"
                : "bg-[#242526] text-white"
            }`}
            onClick={() => setFilter("online")}
          >
            Online
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === "offline"
                ? "bg-red-600 text-white"
                : "bg-[#242526] text-white"
            }`}
            onClick={() => setFilter("offline")}
          >
            Offline
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {filteredFriends.map((friend) => (
            <li
              key={friend.id}
              className="px-4 py-2 hover:bg-gray-700 transition-colors duration-200  rounded-lg "
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-[35px] h-[35px]  rounded-full"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      friend.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-700 ">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {friend.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
          <Users className="h-5 w-5 mr-2" />
          Find New Friends
        </button>
      </div>
    </div>
  );
}
