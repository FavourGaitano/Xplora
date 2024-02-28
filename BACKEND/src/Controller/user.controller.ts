import { Request, Response } from "express";
import {v4} from 'uuid'
import { User } from "../Interface/user.interface";
import mssql from 'mssql';
import bcrypt from 'bcrypt'
import { sqlConfig } from '../Config/sql.Config';
import Connection from '../DbHelper/dbhelper';
import { registerUserSchema } from '../Validators/users.validators';

const dbhelper = new Connection



////check if user exists then create users
export const createUser = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("User:", id);
    const { name, email, password}: User = req.body;

    console.log(req.body);

    const hashed_pwd = await bcrypt.hash(password, 5)

    let {error} = registerUserSchema.validate(req.body)

        if(error){
          return res.status(404).json({
              error: error.details[0].message
          })
        }

    const pool = await mssql.connect(sqlConfig);

    // checking  if user allready  exists in the database by its email
    const result = (await pool
      .request()
      .input('email', mssql.VarChar, email)
      .execute("CheckUserExists")).recordset;

      console.log("Your result",result.length);

      if(result.length >=1){
        return res.status(503).json({message:"This user already exists"});
     
      }else { 
              const createresult = (
                await pool
                  .request()
                .input('user_id', mssql.VarChar, id)
                .input('name', mssql.VarChar, name)
                .input('email', mssql.VarChar, email)
                .input('password', mssql.VarChar, hashed_pwd)
                .execute('registerUser')).rowsAffected;
             

              console.log(createresult);
              return res.status(201).json
                ({message: "User created succesfully."});
        };
        } catch (err) {
          console.log(err);
    return res.sendStatus(500).json({ message: err });
    }
};

//Dbhelper get all users
export const getAllUsers = async(req:Request, res: Response)=>{
    try {
        

      let {error} = registerUserSchema.validate(req.body)

      if(error){
        return res.status(404).json({
            error: error.details[0].message
        })
    }

        let users = (await dbhelper.execute("getAllUsers")).recordset
        

        if(users.length > 0){
            return res.json({
                users
            })
        }else{
            return res.json({
                message: "No users found"
            })
        }
        
    } catch (error:any) {
        return res.json({
            error: error.originalError.info.message
        })
    }
}



//Dbhelper get user by id

export const getOneUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.user_id;
      console.log("User ID:", id);
      let user = (await dbhelper.execute("getOneUser", { user_id: id })).recordset;
  
      return res.json({ user });
    } catch (error) {
      console.log("Error in getting data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue retrieving user" });
    }
  };

//Dbhelper update user

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.user_id;

        const {name, email, password}:User = req.body

      console.log("User ID:", id);

      const hashed_pwd = await bcrypt.hash(password, 5)


      let user = (await (dbhelper.execute("updateUser", { user_id:id, name, email, password:hashed_pwd}))).recordset;
  
      return res.json({ 
        
        message: "User updated successfully"
     });

    } catch (error) {
      console.log("Error in updating data from database", error);
      return res
        .status(400)
        .json({ message: "There was an issue updating user" });
    }
  };

    //Dbhelper delete user

    export const deleteUser = async (req: Request, res: Response) => {
        try {
          const id = req.params.user_id;
          console.log("User ID:", id);
          let user = await dbhelper.execute("deleteUser", { user_id: id });
      
          return res.json({  message: "User deleted successfully" });
        } catch (error) {
          console.log("Error in getting data from database", error);
          return res
            .status(400)
            .json({ message: "There was an issue deleting user" });
        }
      };