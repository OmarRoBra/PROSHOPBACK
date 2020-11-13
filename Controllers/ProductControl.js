const Product= require('../Models/Products')
const asyncHandler = require('express-async-handler')
//@Desc Add  a new product in the DataBase
//@Route POST/api/products/
//@acess Public
exports.postProduct=async(req,res)=>{
    try {
      const producto = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: 'https://cdn.shopify.com/s/files/1/0024/9803/5758/products/image_random_B_1200x1200.jpg?v=1582158590',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
      })
        await producto.save();
        res.status(200).json({data:producto,message:'Ok process'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'hubo un error'})
        
    }
} 
//@Desc get all the products of the Product collection in the DataBase
//@Route GET/api/products
//@acess Public
exports.getproducts=async(req,res)=>{
  try {
      producto= await Product.find()
      res.status(200).json({data:producto,message:'Ok process'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:'hubo un error'})
  }
}
//@Desc look and return for a product with the ID
//@Route GET/api/products/:id
//@acess Public
exports.getproduct=async(req,res)=>{
    try {
        producto= await Product.findById(req.params.id)
        res.status(200).json({data:producto,message:'Ok process'})
    } catch (error) {
      console.log(error)
      return res.status(400).json({message:'hubo un error'})
    }
  }

exports.deleteProduct = asyncHandler(async(req,res)=>{
    producto= await Product.findById(req.params.id)
    if(producto){
      await producto.remove();
      res.json({message:'Product Removed'})
    }else{
      res.status(400).json({message:'No autorizado'})
    }

  
})
exports.updateProduct= asyncHandler(async(req,res)=>{
  const{
    name,
    price,
    description,
    image,
    brand,
    category,
    stock
  }=req.body;
  const product= await Product.findById(req.params.id);

  if(product){
    product.name=name
    product.price=price
    product.description=description
    product.image=image
    product.brand=brand
    product.category=category
    product.stock=stock
    const updatedProduct= await product.save();
    res.status(201).json(product)
  
  }else{
    res.status(404).json('Producto no encotrado')
  }
})