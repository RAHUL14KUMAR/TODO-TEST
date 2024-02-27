const express=require('express');
const { register, login, getMe } = require('../controller/userController');
const protect=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/register')
.post(register)

router.route('/login')
.post(login)

router.get('/profile',protect,getMe)



module.exports=router