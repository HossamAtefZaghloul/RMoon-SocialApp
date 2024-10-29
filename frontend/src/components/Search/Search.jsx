import { useState, useEffect } from "react";
import { Search, User, Loader, UserPlus, X } from "lucide-react";
import useFetch from "../customHooks/UseFetch.jsx";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const limit = 5; //maximum search results
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useFetch(
    "http://localhost:5000/api/users",
    token
  );

  useEffect(() => {
    if (data) {
      const result = data
        .filter(
          (user) =>
            user.username &&
            user.username.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, limit);

      setFilteredData(query ? result : []);
    }
  }, [data, query]);

  return (
    <div className="z-[9999999]">
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
            className="cursor-pointer text-red-700 h-4 w-4 absolute right-2 top-2"
          />
        ) : (
          <Search className="cursor-pointer text-red-700 h-4 w-4 absolute right-2 top-2" />
        )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center text-red-500">
          <Loader className="animate-spin h-5 w-5" />
          <span>Loading...</span>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!isLoading && !error && filteredData.length > 0 && (
        <ul className="space-y-2">
          {filteredData.map((user) => (
            <li
              key={user._id}
              className="bg-[#18191A] shadow rounded-lg p-4 flex items-center space-x-4 z-50 border border-gray-700"
            >
              <User className="h-6 w-6 text-red-800" />
              <div>
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex justify-end w-full text-red-800">
                <button>
                  <UserPlus />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && query && filteredData.length === 0 && (
        <div className="text-center text-red-800 bg-[#242526] rounded-lg p-5 border border-gray-700">
          No users found
        </div>
      )}
    </div>
  );
}
