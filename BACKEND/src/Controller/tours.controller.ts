import { Request, Response } from "express";
import {v4} from 'uuid'
import { Tours } from "../Interface/tours.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';
import { registerUserSchema } from '../Validators/users.validators';

const dbhelper = new Connection



////check if tour exists then create tours
export const createTour = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Tour:", id);
    const { title, image, description, location, start_date, end_date, price, category_id}: Tours = req.body;

    console.log(req.body);

    // let {error} = registerUserSchema.validate(req.body)

    //     if(error){
    //       return res.status(404).json({
    //           error: error.details[0].message
    //       })
    //     }

    const pool = await mssql.connect(sqlConfig);

    // checking  if tour allready  exists in the database by its title
    const result = (await pool
      .request()
      .input('title', mssql.VarChar, title)
      .execute("CheckTourExists")).recordset;

      console.log("Your result",result.length);

      if(result.length >=1){
        return res.status(503).json({message:"This tour already exists"});
     
      }else { 
              const createresult = (
                await pool
                .request()
                .input('tour_id', mssql.VarChar, id)
                .input('title', mssql.VarChar, title)
                .input('image', mssql.VarChar, image)
                .input('description', mssql.VarChar, description)
                .input('location', mssql.VarChar, location)
                .input('start_date', mssql.VarChar, start_date)
                .input('end_date', mssql.VarChar, end_date)
                .input('price', mssql.VarChar, price)
                .input('category_id', mssql.VarChar, category_id)
                .execute('createTour')).rowsAffected;
             

              console.log(createresult);
              return res.status(201).json
                ({message: "Tour created succesfully."});
        };
        } catch (err) {
          console.log(err);
    return res.sendStatus(500).json({ message: err });
    }
};

//Dbhelper get all tours
export const getAllTours = async(req:Request, res: Response)=>{
    try {
        

    //   let {error} = registerUserSchema.validate(req.body)

    //   if(error){
    //     return res.status(404).json({
    //         error: error.details[0].message
    //     })
    // }

        let tours = (await dbhelper.execute("getAllTours")).recordset
        

        if(tours.length > 0){
            return res.json({
                tours
            })
        }else{
            return res.json({
                message: "No tours found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}



//Dbhelper get tour by id

export const getOneTour = async (req: Request, res: Response) => {
    try {
      const id = req.params.tour_id;
      console.log("Tour ID:", id);
      let tours = (await dbhelper.execute("getOneTour", { tour_id: id })).recordset;
  
      return res.json({ tours });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving tour" });
    }
  };

//Dbhelper update tour

export const updateTour = async (req: Request, res: Response) => {
    try {
        const id = req.params.tour_id;

        const {title, image, description, location, start_date, end_date, price, category_id}:Tours = req.body

      console.log("Tour ID:", id);


      let tour = await (dbhelper.execute("updateTour", { tour_id:id, title, image, description, location, start_date, end_date, price, category_id}));
  
      return res.json({ 
        
        message: "Tour updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating tour" });
    }
  };

    //Dbhelper delete tour

    export const deleteTour = async (req: Request, res: Response) => {
        try {
          const id = req.params.tour_id;
          console.log("Tour ID:", id);
          let tour = await dbhelper.execute("deleteTour", { tour_id: id });
      
          return res.json({  message: "Tour deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting tour" });
        }
      };