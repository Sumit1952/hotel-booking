import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hotelcard = ({ room, index }) => (
    <Link 
        to={'/rooms/' + room._id} 
        onClick={() => window.scrollTo(0, 0)} 
        className='relative block bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group'
    >
        {/* Image Wrapper */}
        <div className='relative aspect-square md:aspect-[4/3] w-full overflow-hidden bg-gray-100'>
            <img 
                src={room.images[0]} 
                alt="room photo" 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
            />
            {index % 2 === 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-white text-gray-800 rounded-full shadow-sm z-10">
                    Best Seller
                </span>
            )}
        </div>

        {/* Content */}
        <div className='p-5'>
            <div className='flex items-center justify-between mb-2'>
                <h3 className='font-playfair text-lg font-bold text-gray-900 line-clamp-1'>{room.hotel.name}</h3>
                <div className='flex items-center gap-1 shrink-0 bg-yellow-50 px-2 py-0.5 rounded text-yellow-700 text-xs font-semibold'>
                    <img src={assets.starIconFilled} alt="star" className='h-3 w-3' />
                    <span>4.5</span>
                </div>
            </div>
            
            <div className='flex items-center gap-1 text-gray-500 text-sm mb-4'>
                <img src={assets.locationIcon} alt="location" className='h-4 w-4 shrink-0' />
                <span className='line-clamp-1'>{room.hotel.address}</span>
            </div>
            
            <div className='flex items-center justify-between border-t border-gray-100 pt-4 mt-2'>
                <p className='text-sm text-gray-500'>
                    <span className='text-lg font-bold text-gray-900'>${room.pricePerNight}</span> / night
                </p>
                <button className='text-xs font-semibold px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'>
                    Book Now
                </button>
            </div>
        </div>
    </Link>
)

export default Hotelcard