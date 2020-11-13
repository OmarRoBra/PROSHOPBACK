const mongose = require('mongoose')

const OrderSchema = mongose.Schema({
   user:{
      type:mongose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
   }, 
   orderItems:[
       {
           name:{type:String,required:true},
           qty:{type:Number,required:true},
           image:{type:String,required:true},
           price:{type:String,required:true},
           product:{
               type:mongose.Schema.Types.ObjectId,
               ref:'Product',
               required:true
           }
       }
   ],
   shippingAdress:{
       address:{type:String,required:true},
       city:{type:String,required:true},
       postalCode:{type:String,required:true},
       country:{type:String,required:true}
   },
   paymentMethod:{
       type:String,
       required:true
   },
   paymentResult:{
       id:{type:String},
       status:{type:String},
       update_time:{type:String},
       email_Address:{type:String}
   },
   taxPrice:{
       type:Number,
       required:true,
       default:0.0
   },
   shippingPrice:{
    type:Number,
    required:true,
    default:0.0
},
totalPrice:{
    type:Number,
    required:true,
    default:0.0
},
isPaid:{
    type:Boolean,
    required:true,
    default:false
},
paidAt:{
     type:Date
},
isDelivereded:{  type:Boolean,
    required:true,
    default:false
},
deliveredAt:{
    type:Date
},
createdAt:{
    type:Date,
    default:Date.now()
}
   

},{
    timeStamps:true
})

module.exports=mongose.model('Orders',OrderSchema)