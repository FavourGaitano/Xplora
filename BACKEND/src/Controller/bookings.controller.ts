import { Request, Response } from "express";
import {v4} from 'uuid'
import { Bookings} from "../Interface/bookings.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';
// import { registerUserSchema } from '../Validators/users.validators';

const dbhelper = new Connection




export const createBooking = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Booking:", id);
    const { user_id, tour_id }: Bookings = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    // checking  if user has allready booked the tour
    const result = (
      await pool
        .request()
        .input("tour_id", mssql.VarChar, tour_id)
        .input("user_id", mssql.VarChar, user_id)
        .execute("CheckBookingExists")
    ).recordset;

    console.log("Your result", result.length);

    if (result.length > 0) {
      return res
        .status(503)
        .json({ message: "You've already Booked this tour" });
    } else {
      const createresult = (
        await pool
          .request()
          .input("booking_id", mssql.VarChar, id)
          .input("user_id", mssql.VarChar, user_id)
          .input("tour_id", mssql.VarChar, tour_id)
          .execute("createBooking")
      ).rowsAffected;

      console.log(createresult);
      return res.status(201).json({
        message: "Booking created succesfully.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//Dbhelper get all bookings
export const getAllBookings = async(req:Request, res: Response)=>{
    try {
        

    //   let {error} = registerUserSchema.validate(req.body)

    //   if(error){
    //     return res.status(404).json({
    //         error: error.details[0].message
    //     })
    // }

        let bookings = (await dbhelper.execute("getAllBookings")).recordset
        

        if(bookings.length > 0){
            return res.json({
                bookings
            })
        }else{
            return res.json({
                message: "No bookings found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}



//Dbhelper get booking by id

export const getOneBooking = async (req: Request, res: Response) => {
    try {
      const id = req.params.booking_id;
      console.log("Booking ID:", id);
      let booking = (await dbhelper.execute("getOneBooking", { booking_id: id })).recordset;
  
      return res.json({ booking });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving booking" });
    }
  };

//Dbhelper update booking

export const updateBooking = async (req: Request, res: Response) => {
    try {
        const id = req.params.booking_id;

        const {user_id, tour_id}:Bookings = req.body

      console.log("Booking ID:", id);

    //   const hashed_pwd = await bcrypt.hash(password, 5)


      let booking = await (dbhelper.execute("updateBooking", { booking_id:id, user_id, tour_id}));
  
      return res.json({ 
        
        message: "Booking updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating booking" });
    }
  };

    //Dbhelper delete booking

    export const deleteBooking = async (req: Request, res: Response) => {
        try {
          const id = req.params.booking_id;
          console.log("Booking ID:", id);
          let booking = await dbhelper.execute("deleteBooking", { booking_id: id });
      
          return res.json({  message: "Booking deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting booking" });
        }
      };

      //Dbhelper for when user cancels booking
      export const cancelBooking = async (req: Request, res: Response) => {
        try {
          const id = req.params.booking_id;
          console.log("Booking ID found:", id);
          let booking = await dbhelper.execute("cancelBooking", { booking_id: id });
      
          return res.json({  message: "Booking cancelled successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue cancelling booking" });
        }
      };

      //Dbhelper get booking by user id

      export const GetBookingsByUserId = async (req: Request, res: Response) => {
        try {
          const id = req.params.user_id;
          let booking = (await dbhelper.execute("GetBookingsByUserId", { user_id: id })).recordset;

          return res.json({ booking });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue retrieving booking" });
        }
      };