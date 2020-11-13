const moongose= require('mongoose')


const connectdb= async()=>{
 try {
     const conn=await moongose.connect(process.env.MONGO_URL,{
         useUnifiedTopology:true,
         useNewUrlParser:true,
         useCreateIndex:true
     })
     console.log('Bases de datos conectada');
 } catch (error) {
     console.error(`Error: ${error.message}`)
     process.exit(1)
 }
}
module.exports= connectdb;