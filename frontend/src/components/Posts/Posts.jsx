import { useContext, useState } from "react";
import axios from "axios";
import { PlusCircle, Image } from "lucide-react";
import { UserContext } from "../useContexts/UserProvider.jsx";
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
export default function Posts({ posts }) {
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";
  const [postID, setPostID] = useState("");

  const handlePostDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/Posts/${postID}`
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error(
        "Error deleting resource:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <main className=" w-full h-full">
      <div className="flex flex-col items-center gap-5">
        {[...posts].reverse().map((post, index) => (
          <div
            key={index}
            className="bg-[#242526] rounded-lg shadow p-6 w-full sm:w-[600px] "
          >
            <div className="flex items-center mb-4  ">
              <img
                src={server + user.image}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full mr-3 border border-green-500"
              />
              <div className="flex flex-col w-full">
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-sm text-gray-400 ">
                  <TimeAgo eventTime={post.timeAgo} />
                </p>
              </div>
              <div className="flex justify-end w-full">
                <button
                  onClick={() => {
                    setPostID(post._id);
                  }}
                >
                  <p className="text-gray-400 text-xl font-mono font-extrabold">
                    x
                  </p>
                </button>
              </div>
            </div>
            <p className="flex items-center justify-items-center mb-4 text-white">
              {post.content}
            </p>
            {post.image && ( // Render the image if it exists
              <div className="max-w-full max-h-full">
                <img
                  className="h-auto w-auto rounded"
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
