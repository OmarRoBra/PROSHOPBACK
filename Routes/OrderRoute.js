const express = require('express')
const router= express.Router();
const {protectRoute,isAdmin} = require('../Middleware/authToken')
const {postOrder,getOrder,updateOrderToPaid,myOrders,getOrders,updateOrderTodeliv} = require('../Controllers/OrderControl')

router.get('/myorders',protectRoute,myOrders)
router.get('/:id',protectRoute,getOrder)
router.post('/',protectRoute,postOrder);
router.get('/',protectRoute,isAdmin,getOrders)
router.put('/:id/pay',protectRoute,updateOrderToPaid)
router.put('/:id/delivered',protectRoute,isAdmin,updateOrderTodeliv)

 
 module.exports=router;