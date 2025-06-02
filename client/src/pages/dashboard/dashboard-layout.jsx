import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Navbar from "../../components/dashboard/navbar";
import Sidebar from "../../components/dashboard/sidebar";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  return (
    <>
    Sidebar
      {/* <div className="h-full">
        <nav className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 bg-yellow-200">
          <Navbar/>
        </nav>
        <aside className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 bg-green-200"> 
          <Sidebar/>
        </aside>
        <main className="md:pl-56 h-full pt-[80px] bg-blue-200">
          <Outlet/>
        </main>
      </div> */}
    </>
  );
}

export default DashboardLayout;