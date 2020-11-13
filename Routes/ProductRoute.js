const express = require('express')
const router= express.Router();
const {protectRoute,isAdmin} = require('../Middleware/authToken')
const {postProduct,getproduct,getproducts,deleteProduct,updateProduct} = require('../Controllers/ProductControl')

 router.post('/',protectRoute,isAdmin,postProduct);
 router.get('/',getproducts)
 router.route('/:id')
 .get(getproduct)
 .delete(protectRoute,isAdmin,deleteProduct)
 .put(protectRoute,isAdmin,updateProduct)


 module.exports=router;