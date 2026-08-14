import React from 'react'
import { roomsDummyData } from '../assets/assets'
import Hotelcard from './Hotelcard'
import {useNavigate} from 'react-router-dom'

const FeaturedDestination = () => {
    const navigate = useNavigate();
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Featured Accommodations
            </h2>
            <p className="text-gray-500 max-w-lg text-sm md:text-base">
                Discover our handpicked selection of exceptional rooms offering outstanding comfort, style, and service.
            </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {roomsDummyData.slice(0, 4).map((room, i) => (
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
