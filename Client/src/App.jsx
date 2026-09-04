import React from 'react';
import Navbar from './components/Navbar.jsx';
import {useLocation,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import Footer from './components/Footer.jsx'
import Allrooms from './pages/Allrooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import MyBookings from  './pages/MyBookings.jsx'
import HotelReg from './components/HotelReg.jsx'
import Layout from './pages/HotelOwner/Layout.jsx'
import DashBoard from './pages/HotelOwner/DashBoard.jsx'
import Addroom from './pages/HotelOwner/Addroom.jsx'
import Listroom from './pages/HotelOwner/Listroom.jsx'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx';
import Loader from './components/Loader.jsx';

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg}=useAppContext();
  return (
    <div>
      <Toaster/>
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg></HotelReg>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />}/>
           <Route path='/rooms' element={<Allrooms />}/>
           <Route path='/rooms/:id' element={<RoomDetails />}/>
            <Route path='/my-bookings' element={<MyBookings />}/>
            <Route path='/my_bookings' element={<MyBookings />}/>
             <Route path='/loader/:nexturl' element={<Loader />}/>
             <Route path='/loader/:nexturl/*' element={<Loader />}/>
            <Route path='/owner' element={<Layout></Layout>}>
                  <Route index element={<DashBoard></DashBoard>}></Route>
                  <Route path ="add-room" element={<Addroom></Addroom>}></Route>
                  <Route path ="list-rooms" element={<Listroom></Listroom>}></Route>

            </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
