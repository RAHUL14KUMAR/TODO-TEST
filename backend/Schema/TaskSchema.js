const mongoose=require("mongoose");
const schema=mongoose.Schema

const taskSchema=new schema({
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
    
},{
    timestamps:true
})

module.exports=mongoose.model("tasks",taskSchema)