import { useContext } from "react";
import { PlusCircle, Image } from "lucide-react";
import { UserContext } from "../useContexts/UserProvider.jsx";
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
export default function Posts({ posts }) {
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";

  return (
    <main className="flex-1 p-6 w-full h-full">
      <div className="flex flex-col items-center space-y-6">
        {[...posts].reverse().map((post, index) => (
          <div
            key={index}
            className="bg-[#242526] rounded-lg shadow p-6 w-full sm:w-[500px]"
          >
            <div className="flex items-center mb-4">
              <img
                src={server + user.image}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full mr-3 border border-green-500"
              />
              <div>
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-sm text-gray-400">
                  <TimeAgo eventTime={post.timeAgo} />
                </p>
              </div>
            </div>
            <p className="mb-4 text-white">{post.content}</p>
            {post.image && ( // Render the image if it exists
              <div className="sm:w-[450px] sm:h-[400px]">
                <img
                  className="h-full w-full rounded"
                  src={server + post.image}
                  alt=""
                />
              </div>
            )}
            <div className="flex items-center space-x-4 pt-2">
              <button className="flex items-center text-white hover:text-red-700">
                <PlusCircle className="h-5 w-5 mr-1" />
                Like
              </button>
              <button className="flex items-center text-white hover:text-red-700">
                <Image className="h-5 w-5 mr-1" />
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
