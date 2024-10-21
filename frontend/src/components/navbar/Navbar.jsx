import { React, useContext } from "react";
import { Bell, Home, MessageCircle, Search, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
export default function CompactNavbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";
  console.log(user.image);
  return (
    <div className=" bg-[#18191A] sticky top-0 z-49 bg-cover bg-center shadow border-b border-gray-700  sm:w-full sm:h-full   ">
      <div className="   mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex px-2 lg:px-0 items-center gap-3">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="rounded-full w-[35px] opacity-[0.9] h-[35px]"
                src="../../.././public/Icon.jpg"
                alt=""
              />
              <span className="text-4xl text-red-800 font-extrabold font-serif sm:text-3xl">
                RMoon
              </span>
            </div>
            <div className=" lg:ml-6 lg:flex lg:space-x-4">
              <div className="relative rounded-full text-gray-400 hover:text-gray-500">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#242526] w-full h-8 px-4 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                />
                <Search className=" text-red-700 h-4 w-4 absolute right-2 top-2" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 lg:ml-6">
            <div className="">
              <button
                type="button"
                className=" ml-3 flex-shrink-0 p-1 rounded-full hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
              >
                <span className="sr-only">View notifications</span>
                <Bell className=" text-white h-6 w-6" />
              </button>
            </div>
            <div
              className="flex
            items-center gap-2 justify-center"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={server + user.image}
                alt="profilePicture"
              />
              <span className="text-white">{user.username}</span>
            </div>
            <div className=" text-white flex gap-2  ml-12 items-center">
              <button
                className="flex gap-1 text-white hover:text-red-600   "
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <LogOut className="text-red-700" />
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
