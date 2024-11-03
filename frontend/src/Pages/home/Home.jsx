import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Rigthbar from "../../components/rigthbar/Rigthbar.jsx";
import MainContent from "../../components/main/MainContent.jsx";
const Home = () => {
  return (
    <div className="bg-[#18191A] w-full h-full">
          <div className="flex w-full sticky top-0 z-50">
           <Navbar />
         </div>
        <div className="flex">
          <div className="flex-[2] w-full sticky h-[calc(100vh-57px)] top-[57px]">
            <Sidebar />
          </div>
          <div className="flex-[3.5] flex flex-col items-center ">
          <MainContent/>
          </div>
          <div className=" flex-[2]">
          <Rigthbar/>
          </div>
        </div>
      </div>

  );
};

export default Home;
