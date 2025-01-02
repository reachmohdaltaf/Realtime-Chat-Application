import { useEffect } from "react";
import { User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useSidebarStore } from "../store/useSidebarStore";
import {X} from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
    const { isSidebarOpen, closeSidebar } = useSidebarStore(); // Access sidebar state and close function
    const handleuserclick = (user) => {
      setSelectedUser(user);
      closeSidebar(); // Close sidebar when a user is selected
    }
  const { onlineUsers } = useAuthStore();

 

  useEffect(() => {
    getUsers();
  }, [getUsers]);



  if (isUsersLoading) return <div>Loading...</div>;

  return (
    <div
    className={`fixed  left-0 h-full z-10 bg-[#fff] border text-white transition-transform transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
    style={{ width: '250px' }}
  >       <div className="contact-text flex justify-between w-full border text-black bg-[#fff] p-2 gap-2">
       <div className="conact flex">
       <User />
       <h3 className="text-black text-xl flex font-medium">Contact</h3>
       </div>
      <X className="mt-1 cursor-pointer" onClick={closeSidebar}/>
      </div>
      <div className="users sticky top-20 flex flex-col">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => handleuserclick(user)} // Close sidebar after selecting a user
            className={`flex items-center justify-start mt-1 w-full p-2 transition-all duration-200 text-black hover:shadow-md ${
              selectedUser?._id === user._id
                ? "bg-[#0659D5] text-white shadow-md"
                : ""
            }`}
          >
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.fullName}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="ml-3">{user.fullName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
