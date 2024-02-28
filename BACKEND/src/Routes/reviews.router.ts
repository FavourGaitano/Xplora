import {Router} from "express"
import {createReview, getAllReviews, getOneReview, updateReview, deleteReview} from "../Controller/reviews.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const reviewRouter = Router()

reviewRouter.post('/', createReview)
reviewRouter.get('/get' , verifyToken, getAllReviews)
reviewRouter.get("/:review_id" , verifyToken, getOneReview)
reviewRouter.put("/update/:review_id" , verifyToken, updateReview);
reviewRouter.delete("/:review_id" , verifyToken, deleteReview);


export default reviewRouter