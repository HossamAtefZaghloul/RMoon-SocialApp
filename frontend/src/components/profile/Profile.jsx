import { useState, useContext } from "react";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
import {
  MessageCircle,
  Heart,
  Share2,
  UserPlus,
  Settings,
  Image,
  Bookmark,
  Camera,
} from "lucide-react";

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1234);
  const server = "http://localhost:5000/";
  const { user } = useContext(UserContext);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-[#18191A]">
      <div className="bg-[#18191A] rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-48 bg-[#242526] relative">
          {false ? (
            <img
              src="/placeholder.svg?height=192&width=768"
              alt="UploadPicture"
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="flex
            items-center justify-center text-red-800"
            >
              UplaodPicture
            </span>
          )}
          <button className="absolute bottom-2 right-2 bg-[#18191A] p-2 rounded-full shadow-md">
            <Camera className="w-5 h-5 text-red-800" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 mb-4 sm:mb-0">
            <div className="w-32 h-32 rounded-full border-[4px] border-red-900 overflow-hidden bg-gray-200 z-10">
              <img
                src={server + user.image}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-red-900">
                {user.username}
              </h1>
              <p className="text-[#b6a522]">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-0">
            <div className="flex space-x-4 text-sm text-gray-600 mb-4 sm:mb-0">
              <span className="text-[#b6a522]">
                <strong className="text-red-800">{followerCount}</strong>
                Followers
              </span>
              <span className="text-[#b6a522]">
                <strong className="text-red-800">567</strong> Following
              </span>
              <span className="text-[#b6a522]">
                <strong className="text-red-800">42</strong> Posts
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-md ${
                  isFollowing
                    ? "bg-gray-200 text-gray-800"
                    : "bg-blue-500 text-white"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-800">
                <MessageCircle className="w-4 h-4 inline-block mr-2" />
                Message
              </button>
              <button className="p-2 bg-gray-200 rounded-md text-gray-800">
                <UserPlus className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-200 rounded-md text-gray-800">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="mt-4">
            Professional dog walker and animal lover. Living life one paw at a
            time! 🐾
          </p>
        </div>
      </div>

      <div className="bg-gray-600 rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button className="flex-1 py-2 px-4 text-center border-b-2 border-blue-500 text-blue-500 font-medium">
            Posts
          </button>
          <button className="flex-1 py-2 px-4 text-center text-gray-600">
            Media
          </button>
          <button className="flex-1 py-2 px-4 text-center text-gray-600">
            Likes
          </button>
        </div>
        <div className="p-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="mb-6 last:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Jane Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <p className="mb-4">
                Just finished a great walk with the pups! 🐾 #DogWalker
                #LovingMyJob
              </p>
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Dog walking"
                className="w-full rounded-md mb-4"
              />
              <div className="flex justify-between">
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <Heart className="w-5 h-5 mr-1" />
                  Like
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  Comment
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <Share2 className="w-5 h-5 mr-1" />
                  Share
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500">
                  <Bookmark className="w-5 h-5 mr-1" />
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
