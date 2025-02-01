import { Request ,Response,NextFunction} from "express"
import {db} from "../db/index"

import { userTable } from "../db/userSchema"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"

export const verifyUser=async(req:Request,res:Response,next:NextFunction)=>{

    try{
        const token=req.cookies.user
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const [user]=await db.select().from(userTable).where(eq(userTable.id,decoded.id))
        if(!user){
            return res.status(401).json({message:"unauthorized"})
        }
        
        req.user=user
        next()
    }catch(error){
        res.status(500).json({message:"internal server errror",error})
    }
}