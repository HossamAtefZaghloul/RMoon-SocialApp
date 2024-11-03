import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Rigthbar from "../../components/rigthbar/Rigthbar.jsx";
import MainContent from "../../components/main/MainContent.jsx";
const Home = () => {
  return (
    <div className="flex flex-col bg-[#18191A] w-full h-full">
          <div className="flex w-full h-full sticky top-0 z-50">
           <Navbar />
         </div>
        <div className="flex  w-full h-full">
          <div className="flex-[2] sticky h-[calc(100vh-58px)] top-[58px] w-full">
            <Sidebar />
          </div>
          <div className="flex-[3.5] flex flex-col items-center w-full h-full ">
          <MainContent/>
          </div>
          <div className=" flex-[2] sticky h-[calc(100vh-58px)] top-[58px] w-full">
          <Rigthbar/>
          </div>
        </div>
      </div>

  );
};

export default Home;
