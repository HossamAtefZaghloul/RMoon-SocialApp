import { useContext, useState,useEffect } from "react";
import { Bell, LogOut, UserCheck, UserX } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
import UserSearch from "../Search/Search.jsx";
import useFetch from "../customHooks/UseFetch.jsx";

export default function CompactNavbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(false);
  const { user } = useContext(UserContext);
  const [userB, setUserB] = useState('');
  const server = "http://localhost:5000/";
  const token = localStorage.getItem("token");


  const { data } = useFetch("http://localhost:5000/getfriends", token);

  useEffect(() => {
    if (data) {
      setUserB(data);
      // This will log the fetched data right after it is received
    }
  }, [data]); // Add data as a dependency
  console.log(userB);
  return (
    <div className=" bg-[#18191A] sticky top-0 z-50 bg-cover bg-center shadow border-b border-gray-700  sm:w-full sm:h-full   ">
      <div className="   mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex px-2 lg:px-0 items-center gap-3">
            <div className="flex-shrink-0 flex items-center ">
              <img
                className="rounded-full w-[35px] opacity-[0.9] h-[35px]"
                src="../../.././public/Icon.jpg"
                alt=""
              />
              <span className="text-4xl text-red-800 font-extrabold font-serif sm:text-3xl">
                RMoon
              </span>
            </div>
          </div>

          <div className="w-[600px] ml-12">
            <UserSearch />
          </div>

          <div className="flex items-center gap-5 lg:ml-6">
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  setNotifications(!notifications);
                }}
                type="button"
                className={`m-3 mt-4 flex-shrink-0 p-1 rounded-full border-xl border-red-900 border-2 hover:bg-red-900 focus:outline-none  ${
                  notifications && "bg-red-900"
                } focus:ring-[#101011] `}
              >
                <span className="sr-only">View notifications</span>
                <Bell className=" text-white h-6 w-6" />
              </button>
              {notifications && (
                <div className="absolute top-[57px] w-[250px] h-auto bg-[#18191A] bg-opacity-0 rounded-lg ">
                  <div className="w-auto">
                    <ul className="space-y-0">
                      <li
                        key={user._id}
                        className="bg-[#18191A] shadow p-4 m-0 flex items-center justify-between space-x-4 z-50 rounded-lg border border-red-900"
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={server + user.image}
                              alt={user.username}
                              className="w-[35px] h-[35px] rounded-full"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-700">
                              {user.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              ahmed Online
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <UserCheck className=" text-red-700" />
                            <UserX className=" text-red-700" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex
            items-center gap-2 justify-center"
            >
              <Link to="/profilepage">
                <img
                  className="w-10 h-10 rounded-full"
                  src={server + user.image}
                  alt="profilePicture"
                />
              </Link>
              <span className="text-white">{user.username}</span>
            </div>
            <div className=" text-white flex gap-2  ml-12 items-center">
              <button
                className="flex gap-1 text-white hover:text-red-600   "
                onClick={() => {
                  localStorage.clear();
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
