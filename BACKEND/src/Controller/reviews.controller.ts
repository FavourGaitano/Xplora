import { Request, Response } from "express";
import {v4} from 'uuid'
import { Reviews} from "../Interface/reviews.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';
// import { registerUserSchema } from '../Validators/users.validators';

const dbhelper = new Connection



//check if review exists then create review

export const createReview = async(req: Request, res: Response)=>{
  try {
      const id = v4()

      
      
      const {booking_id, rating, comment, user_id}:Reviews = req.body
      
      console.log(req.body);
     
    const pool = await mssql.connect(sqlConfig)

      let result = (await pool.request()

      .input('review_id', mssql.VarChar, id)
      .input('booking_id', mssql.VarChar, booking_id)
      .input('rating', mssql.VarChar, rating)
      .input('comment', mssql.VarChar, comment)
      .input('user_id', mssql.VarChar, user_id)
      .execute('createReview')).rowsAffected

      console.log(result);

      return res.status(200).json({

          message: 'Review created successfully',
          
      })


  } catch (error) {
      return res.json({error: error})
  }

}
//Dbhelper get all reviews
export const getAllReviews = async(req:Request, res: Response)=>{
    try {
        

    //   let {error} = registerUserSchema.validate(req.body)

    //   if(error){
    //     return res.status(404).json({
    //         error: error.details[0].message
    //     })
    // }

        let reviews = await dbhelper.execute("getAllReviews")
        

        if(reviews.recordset.length > 0){
            return res.json({
                reviews
            })
        }else{
            return res.json({
                message: "No reviews found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}



//Dbhelper get reviews by id

export const getOneReview = async (req: Request, res: Response) => {
    try {
      const id = req.params.review_id;
      console.log("Review ID:", id);
      let review = await dbhelper.execute("getOneReview", { review_id: id });
  
      return res.json({ review });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving review" });
    }
  };

//Dbhelper update review

export const updateReview = async (req: Request, res: Response) => {
    try {
        const id = req.params.review_id;

        const {booking_id, rating, comment, user_id }:Reviews = req.body

      console.log("Review ID:", id);

    //   const hashed_pwd = await bcrypt.hash(password, 5)


      let review = await (dbhelper.execute("updateReview", { review_id:id, booking_id, rating, comment, user_id}));
  
      return res.json({ 
        
        message: "Review updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating review" });
    }
  };

    //Dbhelper delete review

    export const deleteReview = async (req: Request, res: Response) => {
        try {
          const id = req.params.review_id;
          console.log("Review ID:", id);
          let review = await dbhelper.execute("deleteReview", { review_id: id });
      
          return res.json({  message: "Review deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting review" });
        }
      };