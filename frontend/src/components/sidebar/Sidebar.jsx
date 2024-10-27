import {
  Home,
  Users,
  MessageCircle,
  Calendar,
  Settings,
  HelpCircle,
  CircleUser,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  return (
    <div className="bg-[#18191A] flex flex-col border-r border-gray-700 sticky h-[calc(100vh-58px)] top-[58px] ">
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 py-4">
          <li>
            <Link
              to="/home"
              className={`text-white flex items-center px-5 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-red-700
                ${location.pathname === "/home" && "text-red-700 bg-gray-700"}`}
            >
              <Home className="h-5 w-5 mr-3  " />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profilepage"
              className={`text-white flex items-center px-5 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-red-700
                ${
                  location.pathname === "/profilepage" &&
                  "text-red-700 bg-gray-700"
                }`}
            >
              <CircleUser className="h-5 w-5 mr-3  " />
              ProfilePage
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-5 py-2 text-white hover:bg-gray-700 hover:text-red-700  rounded-lg transition-colors duration-200 ${
                location.pathname === "Friends" && "text-red-700 bg-gray-700"
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Friends
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-5 py-2 text-white hover:bg-gray-700 hover:text-red-700  rounded-lg transition-colors duration-200 ${
                location.pathname === "Messages" && "text-red-700 bg-gray-700"
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              Messages
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-5 py-2 text-white hover:bg-gray-700 hover:text-red-700  rounded-lg transition-colors duration-200 ${
                location.pathname === "Events" && "text-red-700 bg-gray-700"
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Events
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-5 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <Link
              className={`flex items-center px-3 py-2 text-white hover:bg-gray-700 hover:text-red-700 rounded-lg transition-colors duration-200 ${
                location.pathname === "Settings" && "text-red-700 bg-gray-700"
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center px-3 py-2 text-white hover:bg-gray-700 hover:text-red-700 rounded-lg transition-colors duration-200 ${
                location.pathname === "HelpCenter" && "text-red-700 bg-gray-700"
              }`}
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              Help Center
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
