import { useState, useEffect } from "react";
import { Search, User, Loader, UserPlus, X } from "lucide-react";
const fetchUsers = async (query, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  // API call to your backend with query and limit parameters
  const allUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
    // Add more users if needed for testing
  ];

  return allUsers
    .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, limit); // Limit the number of results
};

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clear, setClear] = useState(true);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim() === "") {
        setUsers([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchUsers(query);
        setUsers(results);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="z-[9999999]">
      <div className="relative m-3 rounded-full text-gray-400 hover:text-gray-500">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setClear(false);
            console.log(clear);
          }}
          className="bg-[#242526] w-full h-8 px-4 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
          aria-label="Search users"
        />
        {clear ? (
          <Search className=" cursor-pointer text-red-700 h-4 w-4 absolute right-2 top-2" />
        ) : (
          <X
            onClick={() => {
              setQuery("");
              setClear(true);
            }}
            className="cursor-pointer text-red-700 h-4 w-4 absolute right-2 top-2"
          />
        )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center text-red-500">
          <Loader className="animate-spin h-5 w-5" />
          <span className="">Loading...</span>
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

      {!isLoading && !error && users.length > 0 && (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-[#18191A] shadow rounded-lg p-4 flex items-center  space-x-4 z-50 border border-gray-700"
            >
              <User className="h-6 w-6 text-red-800" />
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className=" flex justify-end w-full text-red-800 ">
                <button>
                  <UserPlus />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !error && query && users.length === 0 && (
        <div className="text-center text-red-800 bg-[#242526] rounded-lg p-5 border border-gray-700">
          No users found
        </div>
      )}
    </div>
  );
}
