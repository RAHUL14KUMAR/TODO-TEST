const taskSchema=require("../Schema/TaskSchema")

const addTask=async(req,res)=>{
    try{
        const {description}=req.body;
        const tasks=await taskSchema.create({
            description:description,
            author:req.user._id
        })
        return res.status(201).json({message:"task has been created"})

    }catch(error){

        return res.status(500).json({message:"error has been occoured"})
    }
}

const updateTask=async(req,res)=>{
    try{
        const tasks=await taskSchema.findById(req.params.id)
    
        if(tasks.author.toString()===req.user._id.toString()){
            const task=await taskSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            return res.status(201).json({message:"task has been updated"})
        }else{
            return res.status(201).json({message:"you are not the owner of the task"})
        }

    }catch(error){

        return res.status(500).json({message:"error has been occoured"})
    }
}

const deleteTask=async(req,res)=>{
    try{
        const tasks=await taskSchema.findById(req.params.id)

        if(tasks.author.toString()===req.user._id.toString()){
            const task=await taskSchema.findByIdAndDelete(req.params.id)
            return res.status(201).json({message:"task has been deleted"})
        }else{
            return res.status(201).json({message:"you are not the owner of the task"})
        }

    }catch(error){
    
        return res.status(500).json({message:"error has been occoured"})
    }
}

const getTaskOfParticularUser=async(req,res)=>{
    try{
        const tasks=await taskSchema.find({author:req.user._id});

        if(tasks.length===0){
            return res.status(201).json({message:"no task has benn added by user"})
        }
        return res.status(201).json({message:tasks})

    }catch(error){
    
        return res.status(500).json({message:"error has been occoured"})
    }
}

module.exports={
    addTask,
    updateTask,
    deleteTask,
    getTaskOfParticularUser
}