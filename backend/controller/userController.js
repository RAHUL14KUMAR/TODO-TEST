const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const userSchema=require("../Schema/userSchema")

const generateJwt=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"30d"});
}

// user register themself 
const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email ||!password){
            return res.json(401).json("enter all the details") 
        }

        const users=await userSchema.findOne({email});
        if(users){
            return res.status(203).json("user already exists with this email")
        }

        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(password,salt);

        const user=await userSchema.create({
            name,email,password:hashPass
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJwt(user._id)
        });
    }catch(err){
        return res.status(500).json(err);
    }
}


// user login themself
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
           return res.status(400).json("Enter all details");
        }
        
        const users=await userSchema.findOne({email});
        if(users&&await bcrypt.compare(password,users.password)){
            res.status(200).json({
                _id: users.id,
                name: users.name,
                email: users.email,
                token: generateJwt(users.id),
            });
        }else {
            return res.status(203).json("Wrong credentials or new user");
        }
    }catch(err){
        
        res.status(500).json(err)
    }
}


// logged in user get his profile
const getMe=async(req,res)=>{
    try{
        const {email}=req.user;

        const user=await userSchema.findOne({email});
        res.status(200).json(user)

    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports={
    register,
    login,
    getMe
}