import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../useContexts/UserProvider.jsx";
import CreatePost from "../PostPage/PostPage.jsx";
import Posts from "../Posts/Posts.jsx";

const server = "http://localhost:5000/";

export default function CreatePosts() {
  const [creatP, setCreatP] = useState(false);
  const { user } = useContext(UserContext);
  const [userPost, setUserPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/me/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <main className="flex-1 p-6 w-full h-full">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#242526] flex flex-col rounded-lg shadow p-2 mb-6 justify-center">
          <div className="flex gap-1 p-2 m-2">
            <img
              className="rounded-full w-[55px] h-[55px]"
              src={server + user.image}
              alt="User"
            />
            <input
              onClick={() => {
                setCreatP(true);
              }}
              className="cursor-pointer text-slate-300 bg-[#3A3B3C] p-2 pl-4 m-2 rounded-full w-full"
              placeholder={`What's on your mind, ${user.username}?`}
              type="text"
              readOnly
            />
          </div>
          <div className="flex items-center justify-center">
            <hr className="w-96 border-[#3A3B3C]" />
          </div>

          <div className="flex gap-5 pt-3 m-1 justify-center w-full">
            <img src="../../.././public/1.png" alt="Option 1" />
            <img src="../../.././public/2.png" alt="Option 2" />
            <img src="../../.././public/3.png" alt="Option 3" />
          </div>
        </div>

        {creatP && (
          <div
            onClick={() => {
              setCreatP(false);
            }}
            className="absolute inset-0 z-10 flex justify-center items-center bg-opacity-90 bg-black"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <CreatePost className="w-full" />
            </div>
          </div>
        )}

        <div>
          <Posts posts={userPost} /> {/* Pass the fetched posts here */}
        </div>
      </div>
    </main>
  );
}
