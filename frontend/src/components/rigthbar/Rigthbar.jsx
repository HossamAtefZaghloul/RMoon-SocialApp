import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Users } from "lucide-react";
import jwt_decode from "jwt-decode";
import "./rightbar.css";

const fetchFriends = async (token) => {
  const response = await fetch("http://localhost:5000/api/acceptedfriends", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export default function Rightbar() {
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const userId = tokenData.userId;
  
  const { data: allFriends, isLoading, isError, refetch } = useQuery({
    queryKey: ["acceptedFriends", token],
    queryFn: () => fetchFriends(token),
    enabled: !!token, // Only fetch if token exists
    refetchOnWindowFocus: true, // Refetches data when window regains focus
    refetchInterval: 30000, // Optional: Automatically refetch every 60 seconds
    staleTime: 30000, // Optional: Cache data for 30 seconds before refetching
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading friends list.</p>;

  const filteredFriends = allFriends?.filter((friend) => {
    const friendUsername =
      friend.requester._id === userId
        ? friend.recipient.username
        : friend.requester.username;
  
    return friendUsername.toLowerCase().includes(query.toLowerCase());
  });
  console.log(filteredFriends)

  return (
    <div className="bg-[#18191A] flex flex-col border-l border-gray-700 sticky h-[calc(100vh-58px)] top-[58px]">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Friends</h2>
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
      </div>
      <div className="flex-1 overflow-y-auto sidebar ">
        <ul className="space-y-2">
          {filteredFriends.map((friend) => (
            <li key={friend._id} className="px-4 py-2 hover:bg-gray-700 transition-colors duration-200 rounded-lg">
              <div className="flex items-center">
                <img
                  src={`http://localhost:5000/${friend.requester._id === userId
                    ? friend.recipient.image
                    : friend.requester.image}`}
                  alt={friend.requester.username}
                  className="w-[35px] h-[35px] rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-700">{
                  friend.requester._id === userId
                  ? friend.recipient.username
                  : friend.requester.username
                  }</p>
                  <p className="text-xs text-gray-500">Offline</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          onClick={refetch} // Manual refresh option
        >
          <Users className="h-5 w-5 mr-2" />
          Find New Friends
        </button>
      </div>
    </div>
  );
}
