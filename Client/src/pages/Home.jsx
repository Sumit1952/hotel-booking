import React from 'react'       
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
        <Hero></Hero>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial></Testimonial>
        <Newsletter></Newsletter>
    </div>
  )
}

export default Home