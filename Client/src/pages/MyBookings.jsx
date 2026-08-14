import React from 'react'
import {assets , userBookingsDummyData} from '../assets/assets'
import { useState } from 'react'

const MyBookings = () => {
    const [bookings , setbookings] = useState(userBookingsDummyData);


    
  return (
   <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
  <div className="text-center md:text-left mb-12">
    <h2 className="font-playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
      My Bookings
    </h2>

    <p className="text-gray-500 max-w-lg text-sm md:text-base">
      Easily manage your past, current, and upcoming hotel reservations in one place.
      Plan your trips seamlessly with just a few clicks.
    </p>
  </div>

  {/* Booking Cards */}
  <div className="space-y-6">
    {/* Your booking cards will go here */}
  </div>
  <div className="max-w-6xl mt-8 w-full text-gray-800">
    <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-13">
        <div className="w-1/3">Hotels</div>
        <div className="w-1/3">Date & Timings</div>
        <div className="w-1/3">Payments</div>
    </div>
    {bookings.map((booking)=>(
      <div key ={booking._id} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t">
        {/* hotel details */}
        <div className="flex flex-col md:flex-row">
            <img src={booking.room.images[0]} alt="hotel-img" className="min-md:w-44 rounded shadow object-cover" />
            <div className=" flex  flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">{booking.hotel.name} <span className="font-inter font-medium">({booking.room.roomType})</span></p>
                <div className="flex items-center gap-1 text-sm txt-gray-500">
                     <img src={assets.locationIcon} alt="location-icon" />
                     <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm txt-gray-500">
                     <img src={assets.guestsIcon} alt="guesets-icon" />
                     <span>Guests:{booking.guests}</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
    
            
            </div>
        </div>
         {/* date and timings  */}
         <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
            <div>
                <p>Check-In:</p>
                <p className="text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                </p>
            </div>
             <div>
                <p>Check-Out:</p>
                <p className="text-gray-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                </p>
            </div>

         </div>
          {/* Payment status */}
          <div className="flex flex-col items-start justify-center pt-3">
            <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div> 
                <p className={`text-sm font-medium ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>{booking.isPaid ? "Paid" : "Un Paid"}</p>


            </div>
            {!booking.isPaid && (
                <button className="px-4 py-1.5 mt-4 text-xs border border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">Pay Now</button>
            )}

          </div>
     </div>

    ))}
  </div>
</section>
  )
}

export default MyBookings