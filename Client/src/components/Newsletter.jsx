import React from 'react'

const Newsletter = () => {
  return (
    <>
<div class="w-full bg-slate-900 px-2 text-center text-white py-20 flex flex-col items-center justify-center">
    <p class="text-indigo-500 font-medium">Get updated</p>
    <h1 class="max-w-lg font-semibold text-4xl/[44px] mt-2">Subscribe to our Sumi Hotel Newsletter & get the latest news</h1>
    <div class="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
        <input type="text" class="bg-transparent outline-none rounded-full px-4 h-full flex-1" placeholder="Enter your email address"/>
        <button class="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-indigo-800 hover:text-indigo-100">
            Subscribe now
        </button>
    </div>
</div>   
    </>
  )
}

export default Newsletter