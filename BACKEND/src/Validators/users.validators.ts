import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string().optional(),
    email: joi.string().email().optional(),
    password: joi.string().optional(),
    role: joi.string().optional(),
   
})