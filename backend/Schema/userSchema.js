const mongoose=require("mongoose");
const schema=mongoose.Schema

const userSchema=new schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    
},{
    timestamps:true
})

module.exports=mongoose.model("users",userSchema)