import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, Settings, LogOut, MessageCircle, MenuIcon } from "lucide-react";
import { useSidebarStore } from "../store/useSidebarStore";

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore(); // Access sidebar toggle function
  const { logout } = useAuthStore();

  return (
    <div className="h-14 bg-white text-black flex items-center border-b sticky top-0 z-10 justify-between px-4 md:px-6">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
      <MenuIcon onClick={toggleSidebar} className="cursor-pointer" />
        <Link to="/" className="font-bold text-2xl md:text-3xl">
          chat
        </Link>
        <MessageCircle className="hidden md:block" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-5">
        <Link to="/setting">
          <button className="hover:text-gray-500 active:animate-spin transition-all duration-300">
            <Settings />
          </button>
        </Link>
        <Link to="/profile">
          <button className="hover:text-gray-500">
            <User />
          </button>
        </Link>
        <button
          onClick={logout}
          className="hover:text-red-500 active:scale-90 transition-all"
        >
          <LogOut />
        </button>
      </div>

      {/* Mobile View Icons */}
      <div className="flex md:hidden items-center gap-3">
        <Link to="/setting">
          <Settings />
        </Link>
        <Link to="/profile">
          <User />
        </Link>
        <button onClick={logout}>
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
