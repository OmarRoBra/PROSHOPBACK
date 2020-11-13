const asyncHandler = require('express-async-handler')
const  generateToken =require('../utils/tokenGenerate')
const User = require('../Models/Users')
const { json } = require('express')
//@Desc Loguea un usario con su email y contraseña
//@Route /api/v1/auth/register
//@access Public
exports.authUser= asyncHandler(async(req,res)=>{
    const{email,password}=req.body
    const user = await User.findOne({email})

    if(user && (await user.macthPassword(password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            //Manda a llamar a la funcion para generar un token con el id del usuario
            token:generateToken(user._id)
        })

    }else{
        res.status(401).json({msg:'Invalid Email or Password'})
        throw new Error('Usuario existe')

    }
})
//@Desc Loguea un usario con su email y contraseña
//@Route /api/v1/auth/register
//@access Public
exports.registerUser= asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const exist= await User.findOne({email})
    if(exist){
        res.status(408).json({Error:'ese usuario ya está registrado'})
        throw new Error('Usuario existe')
    }
    const user= new User(req.body);
    await user.save();
    res.status(200).json({_id:user._id,name:user.name,email:user.email, token:generateToken(user._id)})
})
//@Desc Loguea un usario con su email y contraseña
//@Route /api/v1/auth/register
//@access Public
exports.getUser=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,   
            token:generateToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error('Usuario existe')
    } 
})
exports.updateUser=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const user = await User.findById(req.user._id)
    if(user){
        user.name=req.body.name|| user.name
        user.email=req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }
        const updatedUser= await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
          
        })

    }else{
        res.status(400).json({msg:'Usuario no encontrado'})
    } 
})
exports.getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find()
    if(users){
        res.status(200).json(users)
    }else{
        res.status(400).json({msg:'No autorizado'})
    }
})
exports.deleteUsers=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json({msg:'User Removed'})
    }else{
        res.status(404).json({msg:'User not found'})
    }
})
exports.getUserbyId=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404).json({msg:'User not  found'})

    }
})
exports.updateUserbyId=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const user = await User.findById(req.params.id)
    if(user){
        user.name=req.body.name|| user.name
        user.email=req.body.email || user.email
        user.isAdmin= req.body.isAdmin || user.isAdmin
        const updatedUser= await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
          
        })

    }else{
        res.status(400).json({msg:'Usuario no encontrado'})
    } 
})