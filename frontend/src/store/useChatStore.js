import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    

    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get('/messages/user')
            set({users: res.data})
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({isUsersLoading: false})
        }
    },
    getMessages: async(userId)=>{
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})
console.log("Fetched Messages: ", res.data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} =get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.message)
        }
    },

    subscibeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;
  
      const socket = useAuthStore.getState().socket;
      if (!socket) {
          console.error("Socket is not initialized");
          return;
      }
  
      socket.on("newMessage", (message) => {
          set((state) => ({
              messages: [...state.messages, message],
          }));
      });
  
      console.log("Subscribed to messages for user:", selectedUser._id);
  },
  unSubscribeMessages: () => {
      const socket = useAuthStore.getState().socket;
      if (!socket) {
          console.error("Socket is not initialized");
          return;
      }
  
      socket.off("newMessage");
      console.log("Unsubscribed from messages");
  },
  


    setSelectedUser: (selectedUser) => set({selectedUser}),




}))