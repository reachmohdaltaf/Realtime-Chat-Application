import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import ProiflePage from './pages/ProiflePage'
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from 'react-hot-toast'

const App = () => {
 
 
  const {authUser , checkAuth, ischeckingAuth} =  useAuthStore()
 useEffect(() =>{
  checkAuth()
  
 },[checkAuth])

 if(ischeckingAuth && !authUser) return <div>loading...</div>





  return (
    <div className=''>
      <Navbar/>

      <Routes>
        <Route  path='/' element={authUser? <HomePage/>: <Navigate to={'/login'}/>} />
        <Route  path='/signup' element={!authUser ? <SignUpPage/>: <Navigate to={'/'}/>} />
        <Route  path='/login' element={!authUser? <LoginPage/>: <Navigate to={'/'}/>} />
        <Route  path='/setting' element={<SettingPage/>} />
        <Route  path='/profile' element={authUser? <ProiflePage/>: <Navigate to={'/login'}/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App