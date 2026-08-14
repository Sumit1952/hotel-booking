import React, { useState } from 'react'
import { roomsDummyData, assets, facilityIcons } from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating.jsx';


const CheckBox =({label , selected = false ,onChange =()=>{ }}) =>{
      return (
        <label className="flex gap-3 itmes-center cursor-pointer mt-2 text-sm">
           <input type ="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked , label)}></input>
           <span className="font-light select-none">{label}</span>
        </label>
      )
}
const RadioButton =({label , selected = false ,onChange =()=>{ }}) =>{
      return (
        <label className="flex gap-3 itmes-center cursor-pointer mt-2 text-sm">
           <input type ="radio" name="sortOption" checked={selected} onChange={()=>onChange(label)}></input>
           <span className="font-light select-none">{label}</span>
        </label>
      )
}


const Allrooms = () => {
    const navigate = useNavigate();
    const[openFilter, setOpenFilter] = useState(false);

    const roomTypes =[
        "Single Bed",
        "Double Bed",
        "Family Room",
        "Luxury Room"
    ];
    const priceRange = [
        "0 to 5000",
        "500 to 1000",
        "1000 to 1500",
        "1500 to 2000",
        "2000 to 3000"
    ];
    const sortOption=[
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
            <div>
                <div className="flex flex-col items-start text-left">
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Explore our collection of hotel rooms and find the perfect one for your stay.</p>
                </div>
                {roomsDummyData.map((room) => {
                    return (
                        <div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
                            <img  onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} src ={room.images[0]}alt ='hotel-img' title ="View Room Details" className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"></img>
                        <div>
                            <p className="text-gray-500">{room.hotel.city}</p>
                            <p  onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} className='font-playfair text-3xl text-gray-800'>{room.hotel.name}</p>
                            <div className="flex items-center"> 
                                <StarRating></StarRating>
                                <p className='ml-2'>200+ Reviews</p>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                <img src ={assets.locationIcon} alt = "location icon" ></img>
                                <span>{room.hotel.address}</span>
                            </div>
                            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">  
                                {room.amenities.map((item,index)=>(
                                    <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                                        <img src ={facilityIcons[item]} className="w-5 h-5"></img>
                                        <p className="text-xs">{item}</p>
                                    </div>
                                    
                                ))}
                            </div>
                        <p className="text-xl font-semibold">${room.pricePerNight} / Per Night</p>

                        </div>

                        </div>
                    );
                })}

            </div>
            {/* Filter */}
            <div className=" bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
                <div className={`flex items-center justify-between px-5 py-2.5 min-lg border-b border-gray-300 ${openFilter && "border-b-0"  }`}>
                    <p className="text-base font-medium text-gray-800">FILTERS</p>
                    <div className="text-xs cursor-pointer"> 
                        <span onClick={() => setOpenFilter(!openFilter)} className='lg:hidden'>
                            {openFilter ? 'HIDE' : 'SHOW'}
                        </span>
                        <span className='hidden lg:block'>CLEAR</span>
                    </div>
                </div>
                <div className={`${openFilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700 `}>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Popular filters</p>
                    {roomTypes.map((room , index)=>(
                        <CheckBox key={index} label={room}></CheckBox>
                    ))}
                    </div>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Price Range</p>
                    {priceRange.map((range, index)=>(
                        <CheckBox key={index} label={`$ ${range}`}></CheckBox>
                    ))}
                    </div>
                     <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Sort By</p>
                    {sortOption.map((option, index)=>(
                        <RadioButton key={index} label={option}></RadioButton>
                    ))}
                    </div>
                    
                </div>
                

            </div>
        </div>
    )
}

export default Allrooms