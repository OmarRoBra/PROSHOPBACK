const path = require('path')
const express= require('express')
const dotenv=require('dotenv')
const  connectdb = require('./Config/db')
const app = express();
const cors=require('cors')
const products= require('./Routes/ProductRoute')
const users= require('./Routes/UserRoutes')
const orders= require('./Routes/OrderRoute')
const upload=require('./Routes/UploadRoutes')

app.use(cors())
app.use(express.json({extend:true}))

dotenv.config()
connectdb();

app.use('/api/v1/products',products)
app.use('/api/v1/auth',users)
app.use('/api/v1/orders',orders)
app.use('/api/v1/upload',upload)

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))



const PORT =process.env.PORT||5000

app.listen(PORT,console.log('Server up'))