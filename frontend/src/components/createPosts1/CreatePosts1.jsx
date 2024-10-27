import { useState, useContext, useMemo } from "react";
import { UserContext } from "../useContexts/UserProvider.jsx";
import CreatePost from "../PostPage/PostPage.jsx";
import Posts from "../Posts/Posts.jsx";

export default function CreatePosts() {
  const [creatP, setCreatP] = useState(false);
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";

  const memoizedPosts = useMemo(() => {
    return <Posts />;
  }, []);

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
            <img src="/1.png" alt="Option 1" />
            <img src="/2.png" alt="Option 2" />
            <img src="/3.png" alt="Option 3" />
          </div>
        </div>

        {creatP && (
          <div
            onClick={() => {
              setCreatP(false);
            }}
            className="fixed inset-0 z-[999999] flex justify-center items-center bg-opacity-90 bg-black"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <CreatePost className="w-full h-auto" />
            </div>
          </div>
        )}

        <div>{memoizedPosts}</div>
      </div>
    </main>
  );
}
