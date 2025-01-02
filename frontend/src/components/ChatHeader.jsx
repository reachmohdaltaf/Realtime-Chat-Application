import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // If no user is selected, return early (optional)
  if (!selectedUser) {
    return (
      <div className="p-2.5 border-b  border-base-300">
        <p className="text-center">No user selected</p>
      </div>
    );
  }

  return (
    <div className="p-1 border-b bg-white sticky top-14  border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
              className="h-full w-full rounded-full"
                src={selectedUser.profilePic || "/default-avatar.png"} // Fallback to default avatar
                alt={selectedUser.fullName || "User"}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName || "Unknown User"}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
