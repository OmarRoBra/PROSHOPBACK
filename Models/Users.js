const  mongose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema=mongose.Schema({
    name:{
       type:String,
       required:true  
    },
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
      type:Boolean,
      required:true,
      default:false
    }


})
//Metodo que compara las contraseñas.
UserSchema.methods.macthPassword= async function(passwordEntered){
  return await bcrypt.compare(passwordEntered,this.password)
}
//Metodo para encriptar la contraseñan antes de ser enviada a la base datos
UserSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt= await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password, salt)
})

module.exports=mongose.model('User',UserSchema);