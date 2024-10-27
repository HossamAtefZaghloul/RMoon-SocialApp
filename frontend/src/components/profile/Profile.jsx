import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
import { PostsContext } from "../../components/useContexts/PostProvider.jsx";
import { MessageCircle, UserPlus, Settings, Camera } from "lucide-react";
import axios from "axios";
import Posts from "../Posts/Posts.jsx";

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1234);
  const server = "http://localhost:5000/";
  const { user } = useContext(UserContext);
  const { Post } = useContext(PostsContext);
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  // Load profile picture from localStorage on component mount
  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const userId = user.id;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:5000/profilepic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setProfilePic(response.data);
        localStorage.setItem("profilePic", response.data); // Save the URL in localStorage
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-[#18191A]">
      <div className="bg-[#18191A] rounded-lg shadow-md overflow-hidden mb-6 w-full h-full">
        <div className="h-48 bg-[#242526] relative">
          <img
            src={server + profilePic}
            alt="Profile Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-[#18191A] p-2 rounded-full shadow-md">
            <Camera className="w-5 h-5 text-red-800" />
            <input
              onChange={handleFileChange}
              type="file"
              className="absolute inset-0 opacity-0"
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Upload</button>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 mb-4 sm:mb-0">
            <div className="w-32 h-32 rounded-full border-[4px] border-red-900 overflow-hidden bg-gray-200 z-10">
              <img
                src={server + user.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-red-700">
                {user.username}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-0">
            <div className="flex space-x-4 text-sm text-gray-600 mb-4 sm:mb-0">
              <span className="text-gray-600 flex gap-1">
                <strong className="text-red-800">{followerCount}</strong>
                Followers
              </span>
              <span className="text-gray-600">
                <strong className="text-red-800">567</strong> Following
              </span>
              <span>
                <strong className="text-red-800">42</strong> Posts
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  setFollowerCount(
                    isFollowing ? followerCount - 1 : followerCount + 1
                  );
                }}
                className={`px-4 py-2 rounded-md ${
                  isFollowing
                    ? "bg-red-900 text-white"
                    : "bg-red-800 text-white"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button className="px-4 py-2 bg-red-800 rounded-md text-white">
                <MessageCircle className="w-4 h-4 inline-block mr-2" />
                Message
              </button>
              <button className="p-2 bg-[#18191A] rounded-md text-red-800 w-6 h-6">
                <UserPlus className="w-6 h-6" />
              </button>
              <button className="p-2 bg-[#18191A] rounded-md text-red-800 w-6 h-6">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="mt-4 text-white">
            Professional dog walker and animal lover. Living life one paw at a
            time! 🐾
          </p>
        </div>
        <div>
          <Posts />
        </div>
      </div>
    </div>
  );
}
