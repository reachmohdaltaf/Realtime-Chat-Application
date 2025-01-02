import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isSidebarOpen: true, // Initial state of the sidebar
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })), // Toggles sidebar state
  openSidebar: () => set({ isSidebarOpen: true }), // Opens the sidebar
  closeSidebar: () => set({ isSidebarOpen: false }), // Closes the sidebar
}));
