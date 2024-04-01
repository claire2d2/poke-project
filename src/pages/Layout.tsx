import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />

      <div className="Outlet overflow-scroll no-scrollbar md:h-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
