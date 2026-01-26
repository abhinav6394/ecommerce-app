import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan'
import connectDb from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));

// api end points
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req,res)=>{
    res.send("api working")
})


//start server
app.listen(port,()=>{
    console.log("listening on port " , port)
})
