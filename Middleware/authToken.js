const jwt = require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const User = require('../Models/Users');
const { model } = require('../Models/Users');

exports.protectRoute = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
       try {
           token=req.headers.authorization.split(' ')[1]

           const decoded= jwt.verify(token,process.env.TOKEN_SECRET)
           req.user=await User.findById(decoded.id).select('-password')
           next()
       } catch (error) {
           console.log(error)
           res.status(401).json('token no encontrado')

           
       } 
    }
    if(!token){
        res.status(401).json({msg:'Error, Token no encontrado'})
    }
})
exports.isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({msg:'No autorizado'})
    }
}

/* await User.findById(decoded.id)
           console.log(req.user)
           next() */