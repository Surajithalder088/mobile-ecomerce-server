import { Request ,Response} from "express"
import {db} from "../../db/index"
import { productTable } from "../../db/productSchema"
import { eq } from "drizzle-orm"

export const getLists=async(req :Request,res:Response)=>{

    try{
            const products=await db.select().from(productTable)
            res.status(200).json(products)
    }catch(error){
        res.status(500).json({message:"failed to get products lists",error})
    }
        
}

export const getProductById=async(req :Request,res:Response)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const [product]=await db.select().from(productTable).where(eq(productTable.id,Number(id)))
        if(!product){
            return res.status(404).json({message:"failed to get that product"})
        }
          res.status(200).json(product)

    }catch(error){
        res.status(500).json({message:"",error})
    }
  
}

export const createProduct=async(req :Request,res:Response)=>{
 try{
    const {name,description,price,inStock}=req.body
    if(!name || !description || !price || !inStock){
        return res.status(400).json({message:"every field is required"})
    }
     const [result]=await db.insert(productTable).values({name,description,price,inStock}).returning()
    
    res.status(201).json(result)

 }catch(error){
    res.status(500).json({message:"failed to create new product",error})
 }
  
}

export const updateProduct=async(req :Request,res:Response)=>{
    try{
        const{price,inStock}=req.body;
        const {id}=req.params;
       const updatedproduct= await db.update(productTable).set({price,inStock}).where(eq(productTable.id, Number(id))).returning()
        if(!updatedproduct){
            return res.status(400).json({message:"failed to get the updated product"})
        }
        res.status(200).json({message:"products updated",updatedproduct})

    }catch(error){
        res.status(500).json({message:"",error})
    }
   
}
export const deleteProduct=async(req :Request,res:Response)=>{
    try{
        const {id}=req.params;
        const deletedProduct=await db.delete(productTable).where(eq(productTable.id,Number(id)))
        if(!deletedProduct){
            return res.status(400).json({message:"failed to get deleted procuct"})
        }
        res.status(200).json({message:"product deleted ",deletedProduct})

    }catch(error){
        res.status(500).json({message:"",error})
    }
    
}