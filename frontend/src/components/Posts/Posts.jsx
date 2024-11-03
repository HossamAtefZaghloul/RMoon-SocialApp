import { useContext, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { UserContext } from "../useContexts/UserProvider.jsx";
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
import { useQuery} from "@tanstack/react-query";

export default function Posts() {
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";
  const [deletePage, setDeletePage] = useState(false);
  const [postID, setPostID] = useState("");
  const token = localStorage.getItem("token");
  //
  const { data: posts = [], refetch, isLoading, error } = useQuery({
    queryKey: ["profilePic"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/get/user/posts ", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Data fetched:", res.data);
      return res.data;
    },
    cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
    staleTime: 5 * 60 * 1000  // Data is fresh for 5 minutes
  });
  
  if (isLoading) console.log(isLoading);
  if (error) console.log(error);

  //

  const handlePostDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete/post/${postID}`,
        {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
      );
      console.log("Success:", response.data);
      refetch();
      setDeletePage(false);
    } catch (error) {
      console.error(
        "Error deleting resource:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <main className="flex justify-center item w-full h-full">
      <div className="flex flex-col items-center gap-5">
      {posts && posts.length > 0 && [...posts].reverse().map((post, index) => (
          <div
            key={index}
            className="bg-[#242526] rounded-lg shadow p-6 w-full sm:w-[600px]"
          >
            <div className="flex items-center mb-4">
              <img
                src={server + (user?.image || "default-avatar.png")}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full mr-3 border-2 border-red-700"
              />
              <div className="flex flex-col w-full">
                <p className="font-semibold text-white">{user?.username}</p>
                <p className="text-sm text-gray-400">
                  <TimeAgo eventTime={post.timeAgo} />
                </p>
              </div>
              <div className="flex justify-end w-full">
                <button
                  className="text-red-800 text-xl font-mono font-extrabold"
                  onClick={() => {
                    setPostID(post._id);
                    setDeletePage(true);
                  }}
                >
                  x
                </button>
              </div>
            </div>

            {deletePage && postID === post._id && (
              <div
                onClick={() => {
                  setDeletePage(false);
                }}
                className="fixed inset-0 z-10 flex justify-center items-center bg-opacity-30 bg-black"
              >
                <div
                  className="flex items-center justify-center flex-col gap-8 bg-[#18191A] h-[150px] w-[500px] p-4 m-2 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-red-800">
                    ARE YOU SURE YOU WANT TO DELETE THIS POST
                  </p>
                  <div className="flex gap-5 items-center justify-center">
                    <button
                      onClick={handlePostDelete}
                      className="text-white bg-[#3A3B3C] rounded-lg w-[100px] h-[50px] hover:bg-red-800"
                    >
                      YES
                    </button>
                    <button
                      onClick={() => {
                        setDeletePage(false);
                      }}
                      className="text-white bg-[#3A3B3C] rounded-lg w-[100px] h-[50px] hover:bg-red-800"
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            )}

            <p className="flex items-center justify-items-center mb-4 text-white">
              {post.content}
            </p>
            {post.image && (
              <div className="max-w-full max-h-full">
                <img
                  className="h-auto w-auto rounded"
                  src={server + post.image}
                  alt=""
                />
              </div>
            )}
            <div className="flex justify-between p-1 mt-3">
              <button className="flex items-center text-red-800 hover:text-red-900">
                <Heart className="w-5 h-5 mr-1" />
                Like
              </button>
              <button className="flex items-center text-red-800 hover:text-red-900">
                <MessageCircle className="w-5 h-5 mr-1" />
                Comment
              </button>
              <button className="flex items-center text-red-800 hover:text-red-900">
                <Share2 className="w-5 h-5 mr-1" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
