import React from 'react'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12">
            <h2 className="font_playfair text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Our Guest Stories
            </h2>
            <p className="text-gray-500 max-w-lg text-sm md:text-base">
                Explore heartwarming stories and genuine experiences shared by our valued guests.
            </p>
        </div>
          <div className="flex  justify-center  gap-6 mt-20 ">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow ">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                           <StarRating></StarRating>
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial
