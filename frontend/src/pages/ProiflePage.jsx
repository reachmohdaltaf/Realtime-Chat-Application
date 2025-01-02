import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProiflePage = () => {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center flex-col h-screen mt-10 mb-20">
      <div className="profile-card w-2/3 bg-[#fff] gap-5   p-4 flex items-center flex-col">
        <h3 className="text-3xl font-bold">Profile</h3>
        <p className="text-xs">Your Profile Information</p>
        <div className="profileimage h-40 relative w-40 border border-black rounded-full bg-[#A7BBA2] flex items-center justify-center">
        <img
  src={selectedImg || authUser?.profilePic || "/default-avatar.png"}
  alt="Profile"
  className="rounded-full object-cover h-full w-full"
/>
          <label
            htmlFor="avatar-upload"
            className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdateProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdateProfile}
            />
          </label>
        </div>
        <p className="text-sm text-zinc-600">
          {isUpdateProfile
            ? "Uploading..."
            : "Click the camera icon to update your photo"}
        </p>
        <div className="profile-details w-full gap-10 flex items-center justify-center flex-col">
        <h3 className="text-2xl font-bold">Account Information</h3>
        <div className="detail flex flex-col items-center gap-2 w-full">
        <input  className="w-1/2 placeholder:text-zinc-600 p-4" type="text" placeholder={authUser?.fullName} disabled />
        <input className="w-1/2 placeholder:text-zinc-600 p-4" type="email" disabled placeholder={authUser?.email} />
        </div>
        <div className="member-since">
        <p className="text-sm text-zinc-600">Member Since {authUser?.createdAt}</p>
        <h3>{authUser.createdAt?.split("T")[0]}</h3>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default ProiflePage;
