import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Desktop */}
      <div className="hidden md:flex">

        <Sidebar />

        <main className="flex-1 ml-64">

          <Navbar />

          <div className="p-6">
            <Outlet />
          </div>

        </main>

      </div>

      {/* Mobile */}
      <div className="md:hidden">

        <Navbar />

        <main className="pb-20 p-4">
          <Outlet />
        </main>

        <MobileNavbar />

      </div>

    </div>
  );
}