import React, { useEffect, useState } from 'react'
import Hotelcard from './Hotelcard'
import { useAppContext } from '../context/AppContext';
import { roomsDummyData } from '../assets/assets';

const RecommededHotels = () => {
    const { rooms, serchedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotel = () => {
        const roomList = (rooms && rooms.length > 0) ? rooms : roomsDummyData;
        if (!serchedCities || serchedCities.length === 0) {
            setRecommended(roomList.slice(0, 4));
            return;
        }
        const lowerSearched = serchedCities.map(c => typeof c === 'string' ? c.toLowerCase() : '');
        const filteredHotels = roomList.filter((room) =>
            room.hotel?.city && lowerSearched.some(sc => sc && room.hotel.city.toLowerCase().includes(sc))
        );
        setRecommended(filteredHotels.length > 0 ? filteredHotels : roomList.slice(0, 4));
    };

    useEffect(() => {
        filterHotel();
    }, [serchedCities, rooms]);

    return (
        <section className="py-16 px-4 md:px-12 lg:px-16 max-w-[1350px] mx-auto w-full">
            <div className="text-center md:text-left mb-12">
                <h2 className="font-playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    Recommended Accommodations
                </h2>
                <p className="text-gray-500 max-w-lg text-sm md:text-base">
                    Based On Your Search
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {recommended.slice(0, 4).map((room, i) => (
                   <Hotelcard room={room} key={room._id || i} index={i} />
               ))} 
            </div>
        </section>
    );
}

export default RecommededHotels;
