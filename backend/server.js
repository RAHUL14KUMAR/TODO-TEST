require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connect=require('./database/db')
const errorMiddleware=require('./middleware/errorMiddleware');
const userRouter=require('./Routes/userRouter');
const taskRouter=require('./Routes/taskRouter')


const app=express();
app.use(express.json());
app.use(cors());

const port=process.env.PORT;

app.get('/',(rq,res)=>{
    res.status(201).json({message:"welcome to the health system"});
})
app.use('/user',userRouter)
app.use('/task',taskRouter)

app.use(errorMiddleware);
connect();

  app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})