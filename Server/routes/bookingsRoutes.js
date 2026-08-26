import express from 'express';
const bookingsRoutes = express.Router();
import { createBooking , checkAvailabilityAPI , getUserBookings , getHotelBookings , stripePayment } from '../controllers/bookingsController.js';
import { protect } from '../middleware/authMiddleware.js';

// public routes
bookingsRoutes.post("/check-availability", checkAvailabilityAPI);


//private routes
bookingsRoutes.post("/book", protect , createBooking);
bookingsRoutes.get("/user", protect , getUserBookings);
bookingsRoutes.get("/hotel", protect , getHotelBookings);
bookingsRoutes.post("/stripe-payment", protect , stripePayment);

export default bookingsRoutes;