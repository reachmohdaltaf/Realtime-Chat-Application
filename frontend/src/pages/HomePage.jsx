import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/chatContainer'
import { useSidebarStore } from '../store/useSidebarStore'

const HomePage = () => {
  const { isSidebarOpen } = useSidebarStore(); // Access sidebar state

  const {selectedUser,} = useChatStore()


  return (
    <div className='flex h-screen w-full'>
      <div className='w-full flex bg-[#EEEE] h-screen'>
      <Sidebar className={isSidebarOpen ? 'block' : 'hidden'} />       
       <ChatContainer/>
      </div>
    </div>
  )
}

export default HomePage