import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema= new mongoose.Schema({
 username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    lowercase:true,
    trim:true,
    index:true
 },
 email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
 },
 fullname:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    index:true
 },
 avatar:{
    type:String,
    required:true,
 },
 coverImage:{
    type:String,
 },
 watchHistory:[
    {
    type:Schema.Types.ObjectId,
    ref:"Videos"
    }
 ],
 password:{
    type:String,
    required:[true,'Password is required']
 },
 refreshToken:{
    type:String
 }
  
 
},
{
    timestamps: true

}


)

userSchema.pre("save", async function (next) {
   if(!this.isModified("password")) return next();

   this.password= await bcrypt.hash(this.password, 10)
   next()
})

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
   {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname

   },
   process.env.ACCESS_TOKEN_SECRET,
   {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
)
}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign(
   {
      _id:this._id,
     

   },
   process.env.REFRESH_TOKEN_SECRET,
   {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
)
}



export const User=mongoose.model("User",userSchema)
