import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import transporter from "../config/nodemailer.js";
import stripe from "stripe";


const checkAvailability = async({checkInDate , checkOutDate ,room}) =>{
    try{

        const bookings = await Booking.find({
           
           room,
           checkInDate :{$lte : checkOutDate},
           checkOutDate : {$gte : checkInDate},
           status : {$ne : "cancelled"},
        });

        const isAvailable = bookings.length === 0;
        return isAvailable;
    }
    catch(error){
        console.error("Error checking availability",error);
        return false;
    }
    
}

// api to check availability of room 


export const checkAvailabilityAPI = async (req,res) =>{
    try {
        const {room , checkInDate , checkOutDate } = req.method === 'POST' ? (req.body || {}) : (req.query || {});
        const isAvailable = await checkAvailability({checkInDate , checkOutDate ,room});
        res.json({success:true , isAvailable});
    }
    catch(error){
        res.json({success:false , message:error.message});
    }
} 

//api to create new bookings 

export  const createBooking = async (req,res) =>{
    try{
        const {room , checkInDate , checkOutDate , guests,}=req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});
        if (!isAvailable){
            return res.json({success:false ,message:"Room is not available for the selected dates"})
        }
        // get totalprice from room
        const roomData =await Room.findById(room).populate("hotel");
        let totalPrice= roomData.pricePerNight;
        //calculate totalprice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime()- checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        totalPrice = totalPrice * nights;
        // create booking
          const hotelId = roomData.hotel?._id || roomData.hotel;
          const booking =  await Booking.create({
            user,
            room,
            hotel: hotelId,
             guests:+guests,
            checkInDate, 
            checkOutDate,
            totalPrice,
        })
        const mailOption = {
            from: process.env.SENDER_EMAIL, // sender address
            to: req.user.email, // list of recipients
            subject: "Booking Confirmation - SUMI HOTEL", // subject line
            html: `
            <h1>Booking Confirmation - Sumi Hotel</h1>
            <p>Dear ${req.user.username},</p>
            <p>Thank you for choosing Sumi Hotel. Your booking has been confirmed successfully.</p>
            <ul>
              <li><strong>Booking Id: </strong>${booking._id}</li>
              <li><strong>Hotel: </strong>${roomData.hotel?.name || 'Sumi Hotel'}</li>
              <li><strong>Location: </strong>${roomData.hotel?.address || ''}</li> 
              <li><strong>Check-in Date: </strong>${checkIn.toDateString()}</li>
              <li><strong>Check-out Date: </strong>${checkOut.toDateString()}</li>
              <li><strong>Guests: </strong>${guests}</li>
              <li><strong>Total Price: </strong>${process.env.CURRENCY || 'RS'} ${booking.totalPrice}</li>
            </ul>
            <br/>
            <p>We look forward to welcoming you soon.</p>
            <p>Best regards,</p>
            <p>Sumi Hotel</p>
            `
        };

        try {
            await transporter.sendMail(mailOption);
        } catch (emailErr) {
            console.error("Failed to send confirmation email:", emailErr);
        }

        res.json({ success: true, message: "Booking created successfully" });
    }
    catch(error){
        console.log(error)
        res.json({success:false , message:"failed to create booking"});
    }
};
//api to get all bookings for a user 
//get / api /bookings/user
export const getUserBookings = async (req,res)=>{
    try{
        const user = req.user._id;
        const bookings = await Booking.find({user})
            .populate({ path: "room", populate: { path: "hotel" } })
            .populate("hotel")
            .sort({createdAt: -1});
        res.json({success:true , bookings});
    }
    catch(error){
        res.json({success:false , message:"Failed to get bookings"});
    }
};

export const getHotelBookings = async(req , res)=>{
    try{
        const hotel = await Hotel.findOne({owner : req.user._id});
        if(!hotel){
            return res.json({success:false , message:"Hotel not found"});
        }
        const bookings = await Booking.find({hotel : hotel._id}).populate("room hotel user").sort({createdAt: -1});
        //total bookings
        const totalBookings = bookings.length;
        // total revenue
        const totalRevenue = bookings.reduce((acc , booking)=> acc + booking.totalPrice , 0);
        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings
            }
        });
    }
    catch(error){
        res.json({success:false , message:"Failed to fetch bookings"});
    }
}

export const stripePayment = async(req , res)=>{

    try{
        const {bookingId}= req.body;
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.json({success:false, message:"Booking not found"});
        }
        const roomData = await Room.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;

        const {origin}=req.headers;
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const currency = (process.env.CURRENCY || 'usd').toLowerCase() === 'rs' ? 'inr' : (process.env.CURRENCY || 'usd').toLowerCase();

        const line_items = [{
            price_data:{
                currency: currency,
                product_data:{
                    name: roomData?.hotel?.name || "Hotel Room",
                },
                unit_amount: Math.round(totalPrice * 100),
            },
            quantity: 1,
        }];

        //create checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode : "payment",
            success_url : `${origin}/my-bookings?success=true`,
            cancel_url : `${origin}/my-bookings?canceled=true` ,
            metadata :{
                bookingId,
            }
        });
        res.json({success: true , url : session.url});
    }
    catch(error){
        console.error("Stripe Payment Error:", error);
        res.json({success: false, message: error.message});
    }

}