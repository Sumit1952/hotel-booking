import React, { useState, useMemo } from 'react'
import { roomsDummyData, assets, facilityIcons } from "../assets/assets"
import { useNavigate, useSearchParams } from 'react-router-dom'
import StarRating from '../components/StarRating.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)}></input>
            <span className="font-light select-none text-gray-600">{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)}></input>
            <span className="font-light select-none text-gray-600">{label}</span>
        </label>
    )
}

const Allrooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { rooms, navigate, currency } = useAppContext();
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({
        roomType: [],
        priceRange: [],
    });
    const [selectedSort, setSelectedSort] = useState('');

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ];
    const priceRange = [
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000"
    ];
    const sortOption = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];

    // handle changes for filter and sorting
    const handleFilterChange = (checked, value, type) => {
        setSelectedFilter((prevFilter) => {
            const updatedFilters = { ...prevFilter };
            if (checked) {
                updatedFilters[type] = [...updatedFilters[type], value];
            } else {
                updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
            }
            return updatedFilters;
        });
    };

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    };

    // function to check if a room matches the selected room types
    const matchesRoomType = (room) => {
        return selectedFilter.roomType.length === 0 || selectedFilter.roomType.includes(room.roomType);
    };

    // function to check if a room matches the selected price ranges
    const matchesPriceRange = (room) => {
        return selectedFilter.priceRange.length === 0 || selectedFilter.priceRange.some(range => {
            const [min, max] = range.split(' to ').map(Number);
            return room.pricePerNight >= min && room.pricePerNight <= max;
        });
    };

    // function to sort rooms based on the selected sort option
    const sortRooms = (a, b) => {
        if (selectedSort === 'Price Low to High') {
            return a.pricePerNight - b.pricePerNight;
        }
        if (selectedSort === 'Price High to Low') {
            return b.pricePerNight - a.pricePerNight;
        }
        if (selectedSort === 'Newest First') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    };

    // filter Destination
    const filterDestination = (room) => {
        const destination = searchParams.get('destination');
        if (!destination) return true;
        return room.hotel?.city?.toLowerCase().includes(destination.toLowerCase());
    };

    // filter and sort room based on the selected filters and sort option
    const filteredRooms = useMemo(() => {
        const roomList = rooms && rooms.length > 0 ? rooms : roomsDummyData;
        return roomList.filter(room => 
            matchesRoomType(room) && 
            matchesPriceRange(room) && 
            filterDestination(room)
        ).sort(sortRooms);
    }, [rooms, selectedFilter, selectedSort, searchParams]);

    // clear all filters 
    const clearFilters = () => {
        setSelectedFilter({
            roomType: [],
            priceRange: [],
        });
        setSelectedSort('');
        setSearchParams({});
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
            <div>
                <div className="flex flex-col items-start text-left">
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
                </div>
                {filteredRooms.map((room) => {
                    return (
                        <div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
                            <img onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} src={room.images[0]} alt='hotel-img' title="View Room Details" className="w-full md:w-2/3 max-h-80 rounded-xl shadow-lg object-cover cursor-pointer"></img>
                            <div>
                                <p className="text-gray-500 text-sm">{room.hotel.city}</p>
                                <p onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} className='font-playfair text-3xl text-gray-800 cursor-pointer mt-1'>{room.hotel.name}</p>
                                <div className="flex items-center mt-2">
                                    <StarRating></StarRating>
                                    <p className='ml-2 text-sm text-gray-600'>200+ reviews</p>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                    <img src={assets.locationIcon} alt="location icon" ></img>
                                    <span>{room.hotel.address}</span>
                                </div>
                                <div className="flex flex-wrap items-center mt-3 mb-6 gap-3">
                                    {room.amenities.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                                            <img src={facilityIcons[item]} className="w-5 h-5" alt={item}></img>
                                            <p className="text-xs text-gray-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xl font-semibold text-gray-900">${room.pricePerNight} /night</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Filter */}
            <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
                <div className={`flex items-center justify-between px-5 py-2.5 min-lg border-b border-gray-300 ${openFilter && "border-b-0"}`}>
                    <p className="text-base font-medium text-gray-800">FILTERS</p>
                    <div className="text-xs cursor-pointer">
                        <span onClick={() => setOpenFilter(!openFilter)} className='lg:hidden'>
                            {openFilter ? 'HIDE' : 'SHOW'}
                        </span>
                        <span onClick={clearFilters} className='hidden lg:block text-gray-500 hover:text-gray-800'>CLEAR</span>
                    </div>
                </div>
                <div className={`${openFilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700 `}>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Popular filters</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedFilter.roomType.includes(room)}
                                onChange={(checked, label) => handleFilterChange(checked, label, 'roomType')}
                            />
                        ))}
                    </div>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Price Range</p>
                        {priceRange.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`$ ${range}`}
                                selected={selectedFilter.priceRange.includes(range)}
                                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
                            />
                        ))}
                    </div>
                    <div className="px-5 pt-5 pb-5">
                        <p className="font-medium text-gray-800 pb-2">Sort By</p>
                        {sortOption.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedSort === option}
                                onChange={() => handleSortChange(option)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allrooms