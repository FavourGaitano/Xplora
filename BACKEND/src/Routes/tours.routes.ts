import {Router} from "express"
import {createTour, getAllTours, getOneTour, updateTour, deleteTour} from "../Controller/tours.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const toursRouter = Router()

toursRouter.post('/', createTour)
toursRouter.get('/get' , verifyToken, getAllTours)
toursRouter.get("/:tour_id" , verifyToken, getOneTour)
toursRouter.put("/update/:tour_id" , verifyToken, updateTour);
toursRouter.delete("/:tour_id" , verifyToken, deleteTour);


export default toursRouter