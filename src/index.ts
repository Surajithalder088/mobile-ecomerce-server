import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/products/index.js"
import userRoutes from "./routes/users/index.js"
import orderRoutes from "./routes/orders/index.js"
import "dotenv/config"

const app=express();

const port=process.env.PORT || 4000
app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(cookieParser())


app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)



app.listen(port,()=>{
    console.log("server  running on :",port);
    
})