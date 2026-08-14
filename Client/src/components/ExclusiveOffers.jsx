import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12">
            <h2 className="font_playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Exclusive Offers
            </h2>
            <p className="text-gray-500 max-w-lg text-sm md:text-base">
                Unlock limited-time deals, special packages, and exclusive discounts for your next memorable stay.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusiveOffers.map((offer) => (
                <div 
                    key={offer._id} 
                    className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group flex flex-col h-full border border-gray-100"
                >
                    {/* Image Wrapper */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                        <img 
                            src={offer.image} 
                            alt={offer.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {/* Discount Tag */}
                        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full shadow-sm z-10">
                            {offer.priceOff}% OFF
                        </span>
                        {/* Expiry Tag */}
                        <span className="absolute bottom-4 right-4 px-3 py-1 text-[11px] font-semibold bg-black/60 backdrop-blur-xs text-white rounded-md z-10">
                            Expires {offer.expiryDate}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font_playfair text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                            {offer.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-2">
                            {offer.description}
                        </p>
                        
                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-auto">
                            
                            <button className="text-xs font-semibold px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer group/btn">
                                View Offers
                                <img 
                                    className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300 invert" 
                                    src={assets.arrowIcon} 
                                    alt="arrow-icon" 
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-12">
            <button className="px-6 py-2.5 text-sm font-semibold border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer inline-flex items-center gap-2 group">
                View All Offers
                <img 
                    className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" 
                    src={assets.arrowIcon} 
                    alt="arrow-icon" 
                />
            </button>
        </div>
    </section>
  )
}

export default ExclusiveOffers;