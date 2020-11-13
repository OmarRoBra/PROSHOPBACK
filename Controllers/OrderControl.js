const Order= require('../Models/Order')
const asyncHandler = require('express-async-handler')
//@Desc Add  a new product in the DataBase
//@Route POST/api/products/
//@acess Public
exports.postOrder=asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAdress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body

    if(orderItems&& orderItems.length===0){
        res.status(400).json({msg:'No order Item'})
    }else{
        const order=new Order({
            orderItems,
            shippingAdress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
            user:req.user._id
           
        })
        const orderCreated= await order.save();
        res.status(201).json(orderCreated)
    }
  
    
})
  exports.getOrder=asyncHandler(async(req,res)=>{
    const order= await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
    } 
 })
 exports.updateOrderToPaid=asyncHandler(async(req,res)=>{
     const order=await Order.findById(req.params.id)
     if(order){
         order.isPaid=true
         order.paidAt=Date.now()
         //estos resultados vienen de paypal
         order.paymentResult={ 
             id:req.body.id,
             status:req.body.status,
             update_time:req.body.update_time,
             email_adress:req.body.payer.email_adress
         }
         const updateOrder= await order.save();
         res.json(updateOrder)

     }else{
         res.status(404)
     }
 })

 exports.myOrders=asyncHandler(async(req,res)=>{
     console.log(req.user.id)
    const orders=await Order.find({user:req.user._id})
    res.json(orders)
})

exports.getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find()
    res.json(orders)
})
exports.updateOrderTodeliv=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivereded=true
        order.deliveredAt=Date.now()
        const updateOrder= await order.save();
        res.json(updateOrder)
        console.log(updateOrder)
    }else{
        res.status(404)
    }
})