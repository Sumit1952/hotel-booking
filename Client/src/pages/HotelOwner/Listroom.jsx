import React, { useState } from 'react'
import { roomsDummyData, assets } from '../../assets/assets'

const Listroom = () => {
    const [rooms , setRooms] = useState(roomsDummyData);
  return (
    <div>
        <div className="flex flex-col items-start text-left">
        <h1 className='font-playfair text-4xl md:text-[40px]'>Room Lists</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Add Rooms to your hotel, Customize Room Details, Pricing, and Amenities.</p>
      </div>
      <p className="text-gray-500 mt-10">All Rooms</p>
      <div className="w-full  mt-3 max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
        <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="py-3 px-6 font-medium">Name</th>
                <th className="py-3 px-6 font-medium max-sm:hidden">Facility</th>
                <th className="py-3 px-6 font-medium text-center">Price Per Night</th>
                <th className="py-3 px-6 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
                {
                    rooms.map((item , index)=>(
                        <tr key={index}>
                            <td className="py-3  px-4 text-gray-700 border-t border-gray-300">{item.roomType}</td>
                            <td className="py-3  px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">{item.amenities.join(', ')}</td>
                            <td className="py-3  px-4 text-gray-700 border-t border-gray-300 text-center">Rs.{item.pricePerNight}</td>
                            <td className="py-3  px-4  border-t border-gray-300 text-sm text-red-500 text-center">
                                <label htmlFor=""className="relative inline-flex items-center cursor-pointer txt-gray-900 gap-3">
                                    <input className="sr-only peer" type="checkbox" checked={item.isAvailable}/>
                                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200">
                                    </div>
                                    <span className="dot absolute left-1 top-1  bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" ></span>
                    
                                </label>
                            </td>
                            

                        </tr>

                    ))
                }

            </tbody>

        </table>
       </div>

    </div>
  )
}

export default Listroom