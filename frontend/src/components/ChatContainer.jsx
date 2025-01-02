import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser, currentUserId, subscibeToMessages, unSubscribeMessages } =
    useChatStore();
    const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscibeToMessages();
      return () => unSubscribeMessages();
    }
  }, [selectedUser, getMessages]);

  if (isMessageLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col   bg-gray-50 w-full px-5">
      {selectedUser && selectedUser._id && <ChatHeader />}

      {selectedUser?. _id && (
        <div className=" scroll-m-1 h-full   scrollbar overflow-y-scroll p-2">
          {messages?.map((msg, index) => {
            const isSender = msg.senderId === authUser._id; // Check if the logged-in user is the sender
            
            return (
              <div
                key={index}
                className={`flex mb-2 items-start ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`text-lg p-2 rounded-lg max-w-xs ${isSender ? 'bg-blue-500 text-white' : 'bg-[#EEEE] text-black'}`}
                >
                  {msg.text}
                </div>
                {msg.image && (
                  <img src={msg.image} alt="sent" className="w-40 h-auto mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedUser?. _id && (
        <div className="border-t flex items-center justify-center py-2">
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
