import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import {Image} from 'lucide-react'

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Handle image file change and set preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image preview
  const removeImagePreview = () => {
    setImagePreview(null);
    fileInputRef.current.value = ""; // Reset file input
  };

  // Handle message send
  const handleSendMessage = () => {
    if (!text.trim() && !imagePreview) return; // Do nothing if no content

    sendMessage({
      text: text.trim(),
      image: imagePreview, // Pass image data if available
    });

    setText(""); // Clear input field
    removeImagePreview(); // Remove image preview
  };

  return (
    <div className="p-3 border-t fixed bottom-0   bg-white  w-full border bottom-0 border-base-300">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className=" h-auto rounded"
          />
          <button
            onClick={removeImagePreview}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            X
          </button>
        </div>
      )}

      {/* Input and Actions */}
      <div className="flex  items-center gap-1">
        {/* File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className=" px-3 py-1 rounded"
        >
         <Image className=""/>
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message"
          className="flex-1 border rounded p-2"
        />

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          className="bg-[#282c27] text-white px-3 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};
