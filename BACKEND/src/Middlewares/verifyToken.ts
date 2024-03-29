import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, loginUserDetails } from "../Interface/user.interface";
import { sqlConfig } from "../Config/sql.Config";

dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?: loginUserDetails
}

export const verifyToken = (req:ExtendedUserRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.headers['token'] as string
        console.log("I got this token(s) ",token);
        

        if(!token){
            return res.json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, sqlConfig.SECRET as string) as loginUserDetails

        req.info = data
        console.log("I got this data ",data);
        
        
    } catch (error) {
        return res.json({
            error: error
        })
    }

    next()
}