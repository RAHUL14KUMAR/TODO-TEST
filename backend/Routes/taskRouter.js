const express=require('express');
const protect=require('../middleware/authMiddleware');
const { addTask, updateTask, deleteTask, getTaskOfParticularUser } = require('../controller/TaskControllwe');

const router=express.Router();

router.route('/add')
.post(protect,addTask)

router.route('/update/:id')
.put(protect,updateTask)

router.delete('/delete/:id',protect,deleteTask)

router.get('/get',protect,getTaskOfParticularUser)

module.exports=router