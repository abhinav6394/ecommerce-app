import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

//global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// place order using COD
const placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.status(200).send({success:true, message: "order placed"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"errr in cod api"})
    }
}


// place order using stripe
const placeOrderStripe = async (req,res) => {
    try {
        const { userId, items, amount, address } = req.body
        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }  

        const newOrder = new orderModel(orderData)
        await newOrder.save()  
        const line_items = items.map(()=>({
            price_data: {
                currency:currency,
                product_data: {
                    name:items.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
        }))    
        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge * 100
            },
            quantity: 1
        })    

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.status(200).send({success:true,message:"payment success",success_url:session.url});
    } catch (error) {
        console.log(error)
        res.send({success:false,message:"errr in stripe api"})
    }
}

//verify stripe
const verifyStripe = async (req,res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.send({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.send({success:false, message:error.message})
        }
    } catch (error) {
        console.log(error)
        res.send({success:false,message:"errr in verify stripe api"})
    }
}

// place order using razorpay
const placeOrderRazorpay = async (req,res) => {
    
}

// place order using razorpay
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).send({success:true,message:"orders fetched",orders})
    } catch (error) {
        console.log(error)
        res.send({success:false,message:"errr in all order api"})
    }
}

// user orders
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.status(200).send({success:true,message:"orders fetched",orders})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"errr in userOrders api"})
    }
}

// update order status
const updateStatus = async (req,res) => {

    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.status(200).send({success:true,message:"status updated"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:error.message})
    }
    
}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }
