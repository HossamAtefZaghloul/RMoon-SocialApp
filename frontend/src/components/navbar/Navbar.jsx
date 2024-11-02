import { useContext} from "react";
import {LogOut, } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
import UserSearch from "./Search.jsx";
import Notification from './Notification.jsx'

export default function CompactNavbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const server = "http://localhost:5000/";


  return (
    <div className=" bg-[#18191A] border-b border-gray-700 sm:w-full sm:h-full   ">
        <div className="flex justify-between h-14 px-8">
            <div className="flex items-center  gap-3">
              <img
                className="rounded-full w-[35px] opacity-[0.9] h-[35px]"
                src="../../.././public/Icon.jpg"
                alt=""
              />
              <span className=" text-red-800 font-extrabold font-serif sm:text-3xl">
                RMoon
              </span>
            </div>
          <div className="ml-12 flex sm:w-[600px] min-w-[160px] ">
            <UserSearch />
          </div>
          <div className="flex gap-5">
              <Notification/>
            <div className="flex items-center gap-2 justify-center">
              <div className="flex items-center justify-center w-[44px] h-[44px]  overflow-hidden">
                <Link to="/profilepage">
                  <img
                    className="w-full h-full object-cover border-2 rounded-full border-red-700"
                    src={server + user.image}
                    alt="profilePicture"
                  />
                </Link></div>
              <span className="text-white">{user.username}</span>
            </div>
            <div className="flex text-white gap-2 px-8 items-center">
              <button
                className="flex gap-1 text-white hover:text-red-600   "
                onClick={() => {
                  // localStorage.clear();
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
  );
}
