import React, { useEffect } from 'react'
import NavBar from '../../components/HotelOwner/NavBar'
import SideBar from '../../components/HotelOwner/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner , navigate}= useAppContext();

  useEffect(()=>{
   if(!isOwner){
    navigate('/');
   }
  } ,[isOwner]);
  return (
    <div className="flex flex-col h-screen">
        <NavBar></NavBar>
        <div className="flex h-full">
            <SideBar></SideBar>
            <div className="flex-1 p-4 pt-10 md:px-10 h-full">
                <Outlet></Outlet>
            </div>
        </div>

    </div>
  )
}

export default Layout