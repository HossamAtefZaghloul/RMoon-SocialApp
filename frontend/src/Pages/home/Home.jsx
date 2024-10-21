import { React, useContext } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Rigthbar from "../../components/rigthbar/Rigthbar.jsx";
import MainContent from "../../components/main/MainContent.jsx";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";
const Home = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/posts`
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-[#18191A] sm:w-full sm:h-full  w-[115vh] h-full">
      <div>
        <Navbar />

        <div className=" flex h-full">
          <div className="flex-[2] sticky h-[calc(100vh-58px)] top-[58px] ">
            <Sidebar />
          </div>
          <div className="w-[480px] h-full  flex-[3.5] flex flex-col items-center ">
            <MainContent />
          </div>
          <div className=" flex-[2]  ">
            <Rigthbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
