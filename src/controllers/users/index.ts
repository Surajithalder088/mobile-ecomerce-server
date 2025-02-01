import { Request ,Response} from "express"
import {db} from "../../db/index.js"
import { productTable } from "../../db/productSchema.js"
import { userTable } from "../../db/userSchema.js"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"


import "dotenv/config"

export const registeruser=async(req:Request,res:Response)=>{

  try{
const {name,email,password}=req.body
if(!name || !email || !password){
  return  res.status(500).json({message:" all field are required"})
}
const [result]=await db.insert(userTable).values({name,email,password}).returning()
if(!result){
    return  res.status(500).json({message:" failed to create user"})
}
    res.status(201).json({message:"user created",result})

  }catch(error){
    res.status(500).json({message:"internal server errror",error})
  }
}

export const loginuser=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        if( !email || !password){
            return  res.status(500).json({message:" all field are required"})
          }
        const [user]=await db.select().from(userTable).where(eq(userTable.email,email))
        if(!user){
            return res.status(404).json({message:"failed to get that user"})
        }
        if(user.password !== password){
            return res.status(401).json({message:"failed to login"})
        }
        const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET)
        res.cookie("user",token,{httpOnly:true,maxAge:24*60*60*1000})
          res.status(200).json({message:"login successfull",user})
    
      }catch(error){
        res.status(500).json({message:"internal server errror",error})
      }
}
export const userprofile=async(req:Request,res:Response)=>{
    try{
        res.status(200).json({message:"user profile",user:req.user})
    
      }catch(error){
        res.status(500).json({message:"internal server errror",error})
      }
}