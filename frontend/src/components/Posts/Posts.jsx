import { useContext, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2, HeartCrack } from "lucide-react";
import { UserContext } from "../useContexts/UserProvider.jsx";
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";

export default function Posts(profile) {
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";
  const [deletePage, setDeletePage] = useState(false);
  const [postID, setPostID] = useState("");
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const userId = tokenData.userId;
  const queryClient = useQueryClient(); // Access queryClient


  const {
    data: posts = [],
  } = useQuery({
    queryKey: ["userPosts", profile],
    queryFn: async () => {
      const profilepage = profile.profile;
      const res = await axios.get(
        `http://localhost:5000/api/get/user/posts/${profilepage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
  //
  const { mutateAsync: likePost } = useMutation({
    mutationFn: async (postid) => {
      const response = await axios.post(
        "http://localhost:5000/api/like/post",
        { postid, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );    
      return response.data; 
    },
    // Optimistic update
    onMutate: async (postid) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["userPosts", profile]);
      // Snapshot of the previous state
      const previousPosts = queryClient.getQueryData(["userPosts", profile]);

      // Optimistically update the liked post
      queryClient.setQueryData(["userPosts", profile], (oldPosts) => {
        return oldPosts.map((post) =>
          post._id === postid
            ? {
                ...post,
                likeCount: post.likedBy.includes(userId)
                  ? post.likeCount - 1
                  : post.likeCount + 1,
                likedBy: post.likedBy.includes(userId)
                  ? post.likedBy.filter((id) => id !== userId)
                  : [...post.likedBy, userId],
              }
            : post
        );
      });

      // Return a context that contains the previous state
      return { previousPosts };
    },
    // Rollback the optimistic update on error
    onError: (err, postid, context) => {
      queryClient.setQueryData(["userPosts", profile], context.previousPosts);
    },
    // On success, invalidate the query to refetch the posts
    onSuccess: () => {
      queryClient.invalidateQueries(["userPosts", profile]);
    },
  });
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
      queryClient.invalidateQueries(["userPosts"]);
      setDeletePage(false);
    } catch (error) {
      console.error(
        "Error deleting resource:",
        error.response ? error.response.data : error.message
      );
    }
  };

    const cachedData = queryClient.getQueryData(["userPosts", profile]);
    if (cachedData) {
      // console.log("Cached posts data:", cachedData);
    } else {
      // console.log("No cached data available for 'userPosts'");
    }


  return (
    <main className="flex justify-center item w-full h-full">
      <div className="flex flex-col items-center gap-5">
        {posts &&
          posts.length > 0 &&
          [...posts].reverse().map((post, index) => (
            <div
              key={index}
              className="bg-[#242526] rounded-lg shadow p-6 w-full md:w-[600px] lg:w-[600px]"
            >
              <div className="flex items-center mb-4">
                <img
                  src={server + (post.user ? post.user.image : user.image)}
                  alt="User Avatar"
                  className="w-[50px] h-[50px] rounded-full mr-3 border-2 border-red-700"
                />
                <div className="flex flex-col w-full">
                  <p className="font-semibold text-white">
                    {post.user ? post.user.username : user.username}
                  </p>
                  <p className="text-sm text-gray-400">
                    <TimeAgo eventTime={post.timeAgo} />
                  </p>
                </div>
                <div className="flex justify-end w-full">
                  {profile.profile && (
                    <button
                      className="text-red-800 text-xl font-mono font-extrabold"
                      onClick={() => {
                        setPostID(post._id);
                        setDeletePage(true);
                      }}
                    >
                      x
                    </button>
                  )}
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
                    className="h-full w-full rounded border-2 border-red-900"
                    src={server + post.image}
                    alt=""
                  />
                </div>
              )}

              {post.likeCount ? (
                <div className="flex gap-1 items-center">
                  <Heart className="text-red-500 w-4" />
                  <span className="text-white text-[15px]">
                    {post.likeCount}
                  </span>
                </div>
              ) : null}
              <div className="flex justify-between p-1 mt-3 border-t-2 border-gray-700">
                <button
                  onClick={() => likePost(post._id)}
                  className="flex items-center text-red-800 hover:text-red-900"
                >
                  {post.likedBy.some((id) => id === userId) ? (
                    <>
                      <HeartCrack className="w-5 h-5 mr-1" />
                      <span>UnLike</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-1" />
                      <span>Like</span>
                    </>
                  )}
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
