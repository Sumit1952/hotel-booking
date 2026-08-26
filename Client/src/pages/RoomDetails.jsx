import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { roomsDummyData, assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async () => {
    try {
      // check if check-in date is greater than check out date
      if (checkInDate >= checkOutDate) {
        toast.error('Check-In Date must be smaller than Check-Out Date');
        return;
      }
      const { data } = await axios.post('/api/bookings/check-availability', { room: id, checkInDate, checkOutDate });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success('Room is available ');
        } else {
          setIsAvailable(false);
          toast.error('Room is not available ');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // onSubmitHandler function to check availability & book the room 
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      }
      else {
        const { data } = await axios.post('/api/bookings/book', { room: id, checkInDate, checkOutDate, guests, paymentMethod: 'Pay at Hotel' }, { headers: { Authorization: `Bearer ${ await getToken()}` } })
        if(data.success){
          toast.success(data.message)
          navigate('/my-bookings')
          window.scrollTo(0,0)
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const roomList = rooms && rooms.length > 0 ? rooms : roomsDummyData;
    const foundRoom = roomList.find((r) => r._id === id);

    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images?.[0]);
    }
  }, [id, rooms]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">{room.hotel?.name} <span className="font-inter text-sm">({room.roomType})</span> </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">20% OFF</p>
        </div>
        <div>
            {/* Room rating*/}
            <div className="flex items-center gap-1 mt-2"> 
                <StarRating></StarRating>
                <p className="ml-2">200+ Reviews</p>
            </div>

            {/* Room Address*/}
            <div className=" flex items-center gap-1 text-gray-500 mt-2"> 
                <img src ={assets.locationIcon} alt =""></img>
                <span>{room.hotel?.address}</span>
            </div>
              {/* Room Image*/}
              <div className="flex flex-col lg:flex-row gap-6 mt-6" >
                <div className="lg:w-1/2 w-full">
                    <img src ={mainImage} alt="room img" className="w-full rounded-xl shadow-lg object-cover"></img>
                </div>
                    <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                        {room.images?.length > 1 && room.images.map((image, index) => ( <img onClick ={()=>setMainImage(image)}  key={index}  src={image}   alt="room img" className={`w-full shadow-md object-cover rounded-xl cursor-pointer ${mainImage===image && 'outline-3 outline-orange-500'}` }/>  ))}
                    </div>

              </div>
            
        </div>
        {/*Room Highlights*/}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">  
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before </h1>
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities?.map((item, index)=>(
                        <div key ={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"> 
                         <img src ={facilityIcons[item]} alt={item} className='w-5 h-5'></img>
                         <p className="text-xs">{item}</p>
                        </div>

                    ))}
                </div>
            </div>
            <p className="text-2xl  font-medium">${room.pricePerNight}/Night</p>

        </div>

        {/* Checkin checkout form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">

                    <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 ">
                        <div className="flex flex-col">
                          <label htmlFor="checkInDate" className="font-medium">Check-In</label>
                          <input onChange={(e)=>setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]}  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" type="date" id="checkInDate" placeholder="Check_In"></input>
                        </div>

                        <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                        <div className="flex flex-col">
                          <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
                          <input onChange={(e)=>setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" type="date" id="checkOutDate" placeholder="Check_Out"></input>
                        </div>

                        <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                         <div className="flex flex-col">
                          <label htmlFor="guests" className="font-medium">Guests</label>
                          <input onChange={(e)=>setGuests(e.target.value)} value={guests} className="max-w-20 rounded border-gray-300 px-3 py-2 mt-1.5 outline-none" type="number" id="guests" placeholder="1" required></input>
                        </div>
                      
                        
                    </div>
                    <button type="submit" className=" cursor-pointer bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base  ">{isAvailable ? "Book Now" : "Check Availability"}</button>
        </form>
        {/* common specification*/}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec , index)=>(
             <div key={index} className="flex items-start gap-2 ">
                 <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
                 <div>
                  <p className="text-base">{spec.title}</p>
                  <p className="text-gray-500">{spec.description}</p>
                 </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500" >
          <p>Welcome to our Sumi hotel, where comfort meets elegance. Our Sumi hotel offers spacious, well-furnished rooms with modern amenities, including free Wi-Fi, air conditioning, smart TVs, and 24-hour room service. Guests can enjoy delicious cuisine at our in-house restaurant, relax in comfortable lounges, and experience exceptional hospitality from our friendly staff. Conveniently located near popular attractions and business districts, our hotel is the perfect choice for both business and leisure travelers, ensuring a memorable and relaxing stay.</p>
        </div>

         {/* Hosted by*/}
        <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <img src={room.hotel?.owner?.image || assets.userIcon || assets.profileIcon} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full"></img>
            </div>
            <div>
                <p className="text-lg md:text-xl">Hosted By {room.hotel?.name}</p>
                <div className="flex items-center mt-1">
                  <StarRating></StarRating>
                  <p className="ml-2">200+ Reviews</p>
                </div>
            </div>
  

        </div>
        <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">Contact Now</button>
        
        

      </div>
    )
  );
};

export default RoomDetails;