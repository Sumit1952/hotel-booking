import React from 'react'
import Hotelcard from './Hotelcard'
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const FeaturedDestination = () => {
    const {rooms , navigate}=useAppContext();
  return rooms.length> 0 && (
    <section className="py-16 px-4 md:px-12 lg:px-16 max-w-[1350px] mx-auto w-full">
        <div className="text-center md:text-left mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Featured Accommodations
            </h2>
            <p className="text-gray-500 max-w-lg text-sm md:text-base">
                Discover our handpicked selection of exceptional rooms offering outstanding comfort, style, and service.
            </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {rooms.slice(0, 4).map((room, i) => (
               <Hotelcard room={room} key={room._id || i} index={i} />
           ))} 
        </div>
        <button onClick={() => { navigate('/rooms'); window.scrollTo(0,0); }} className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"> 
            View All Destinations
        </button>
    </section>
  )
}

export default FeaturedDestination
