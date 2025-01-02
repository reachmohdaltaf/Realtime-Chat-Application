import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE == "development" ? "http://localhost:5001" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIng: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("error in check auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      console.log("User signed up successfully", res.data);
      toast.success("User signed up successfully");
      get().connectSocket();

    } catch (error) {
      console.error("Error during signup", error);
    } finally {
      set({ isSigninUp: false });
    }
  },
  login: async (data) => {
    set({isLoggingIng: true});
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      console.log("User logged in successfully", res.data);
      toast.success("User logged in successfully");

      //socket
      get().connectSocket();

    } catch (error) {
      console.error("Error during login", error);
    }finally{
      set({isLoggingIng: false});
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      console.log("User logged out successfully");
      toast.success("User logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error during logout", error);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },


  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser) return;

    const socket = io("BASE_URL", {
        query: { userId: authUser._id }, // Pass userId to the server for user mapping
    });
    socket.connect();

    socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
    });

    set({ socket }); // Store the socket instance in the Zustand store
},

  disconnectSocket: async () => {
    if(get().socket?.connected){
      get().socket.disconnect();
    }
  }


}));
