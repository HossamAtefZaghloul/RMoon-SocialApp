import { useContext, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2, HeartCrack } from "lucide-react";
import { UserContext } from "../components/useContexts/UserProvider.jsx";
import TimeAgo from "../components/TimeAgo/TimeAgo.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";

const Test = () => {
  const profile = true;
  const { user } = useContext(UserContext);
  const [postID, setPostID] = useState("");
  const token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const userId = tokenData.userId;
  const queryClient = useQueryClient();
  const server = "http://localhost:5000/";

  // Query to fetch posts
  const {
    data: posts = [],
    isLoading,
    error,
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

  // Mutation for liking a post with optimistic update
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
      return response.data; // This data can be used to update UI or invalidate queries
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

  return (
    <main className="flex justify-center items-center w-full h-full">
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
              </div>

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
                  onClick={() => likePost(post._id)} // Trigger like post mutation with optimistic update
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
};

export default Test;
