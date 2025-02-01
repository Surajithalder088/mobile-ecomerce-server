import { Request ,Response} from "express"
import {db} from "../../db/index.js"
import { productTable } from "../../db/productSchema.js"
import { userTable } from "../../db/userSchema.js"
import { eq } from "drizzle-orm"
import { orderTable } from "../../db/orderSchema.js"

export const getOrders=async(req:Request,res:Response)=>{
    try{
        const userId=req.user.id;
       
        const orders=await db.select().from(orderTable).where(eq(orderTable.userId,Number(userId)))
        if(!orders){
            return   res.status(404).json({message:'no orders have found'})
        }
        res.status(200).json({message:'order lists',orders})
    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const getOrdersByProduct=async(req:Request,res:Response)=>{
    try{
       
        const id=req.params.productId;
       
        const orders=await db.select().from(orderTable).where(eq(orderTable.product,Number(id)))
        if(!orders){
            return   res.status(404).json({message:'no orders have found'})
        }
        res.status(200).json({message:'order lists',orders})
        
    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}
export const makeOrder=async(req:Request,res:Response)=>{
    try{
        const userId=req.user.id;
        const{product,price}=req.body;
        if(!userId || !product ||!price){
            return res.status(400).json({message:'all fields are required'})
        }
        const [result]=await db.insert(orderTable).values({userId,product,price}).returning();

        res.status(201).json({message:'order created',result})
    }catch(error){
        res.status(500).json({message:'internal server error',error})
    }
}