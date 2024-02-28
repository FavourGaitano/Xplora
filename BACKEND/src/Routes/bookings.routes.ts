import {Router} from "express"
import {createBooking, getAllBookings, getOneBooking, updateBooking, deleteBooking, cancelBooking, GetBookingsByUserId} from "../Controller/bookings.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const bookingRouter = Router()

bookingRouter.post('/', createBooking)
bookingRouter.get('/get' , verifyToken, getAllBookings)
bookingRouter.get("/:booking_id" , verifyToken, getOneBooking)
bookingRouter.put("/update/:booking_id" , verifyToken, updateBooking);
bookingRouter.delete("/:booking_id" , verifyToken, deleteBooking);
bookingRouter.put("/cancel/:booking_id" , verifyToken, cancelBooking);
bookingRouter.get("/userID/:user_id" , verifyToken, GetBookingsByUserId)


export default bookingRouter