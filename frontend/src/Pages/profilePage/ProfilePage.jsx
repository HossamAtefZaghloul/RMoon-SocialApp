import Navbar from "../../components/navbar/Navbar";
import Rigthbar from "../../components/rigthbar/Rigthbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Profile from "../../components/profile/Profile";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />

      <div className=" flex h-full bg-[#18191A]">
        <div className="flex-[2] sticky h-[calc(100vh-58px)] top-[58px] ">
          <Sidebar />
        </div>
        <div className=" h-full  flex-[6] flex flex-col items-center ">
          <Profile />
        </div>
        <div className=" flex-[2]  ">
          <Rigthbar />
        </div>
      </div>
    </div>
  );
}
