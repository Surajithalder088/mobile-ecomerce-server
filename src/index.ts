import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/products/index"
import userRoutes from "./routes/users/index"
import "dotenv/config"

const app=express();

const port=process.env.PORT || 4000
app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(cookieParser())


app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)



app.listen(port,()=>{
    console.log("server  running on :",port);
    
})