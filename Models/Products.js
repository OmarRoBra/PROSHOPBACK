const mongoose = require('mongoose')
const reviewScheema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true}

},{
    timeStamps:true
}
)

const ProductSchema= mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    reviews:[reviewScheema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        default:0
    }
    
},{
    timeStamps:true
})
module.exports=mongoose.model('Product',ProductSchema)