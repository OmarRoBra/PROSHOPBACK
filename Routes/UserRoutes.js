const express = require('express')
const router= express.Router();
const {protectRoute,isAdmin} = require('../Middleware/authToken')
const {authUser,registerUser,getUser,updateUser,getAllUsers,deleteUsers,getUserbyId,updateUserbyId } = require('../Controllers/UserControllers')

 router.post('/register',registerUser);
 router.post('/login',authUser)
 router.route('/user') 
 .get(protectRoute,getUser)
 .put(protectRoute,updateUser)
 router.route('/')
 .get(protectRoute,isAdmin,getAllUsers)
 router.route('/:id')
 .delete(protectRoute,isAdmin,deleteUsers)
 .get(protectRoute,isAdmin,getUserbyId)
 .put(protectRoute,isAdmin,updateUserbyId)

 module.exports=router;