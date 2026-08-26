import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const DashBoard = () => {
  const { currency, user, getToken, axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0
  })

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/bookings/hotel', { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        setDashboardData(data.dashboardData || { bookings: [], totalBookings: 0, totalRevenue: 0 });
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col items-start text-left">
        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Dashboard</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Explore your hotel bookings, total revenue, and performance.</p>
      </div>
      <div className="flex gap-4 my-8">
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalBookingIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">{dashboardData.totalBookings || 0}</p>
          </div>
        </div>
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalRevenueIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">{currency}{dashboardData.totalRevenue || 0}</p>
          </div>
        </div>
      </div>

      {/*Recent Bookings */}
      <div className="flex flex-col items-start text-left">
        <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
        <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="py-3 px-6 font-medium">User Name</th>
                <th className="py-3 px-6 font-medium max-sm:hidden">Room Name</th>
                <th className="py-3 px-6 font-medium text-center">Total Amount</th>
                <th className="py-3 px-6 font-medium text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {dashboardData.bookings?.map((item, index) => (
                <tr key={index} className="">
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.user?.username || "User"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.room?.roomType || "Room"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    {currency}{item.totalPrice}
                  </td>
                  <td className='py-3 px-4 border-t border-gray-300 flex'>
                    <button className={`py-1 px-3 text-sm rounded-full mx-auto ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>{item.isPaid ? "Completed" : "Pending"}</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashBoard