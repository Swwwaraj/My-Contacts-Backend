const asyncHandler =require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User =require("../models/userModel");
//@Desc Register a User
//@Roure Post /api/users/register
//@Access Public
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new error ("All field are mandatory!");
    };
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already Registered!");
    };

    //Hash Password
    const hashPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:", hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log('User create ${user}');
    if(user) {
        res.status(201).json({_id: user.id, email: user.email});
    }else {
        res.status(400);
        throw new Error("User date us not valid");
    }
    res.json({ message: "Register the user"});
});

//@Desc Login User
//@Roure Post /api/users/login
//@Access Public
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All field are mandatory!");

    }
    const user = await User.findOne({ email });
    //compare password with hashpassword
    if(user && (await bcrypt.compare ( password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id, 
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
    );
        res.status(200).json({accessToken});
    }else {
        res.status(401)
        throw new Error("email or passwors is not valid");
    }

});

//@Desc Current user info
//@Roure Post /api/users/current
//@Access Private
const currentUser = asyncHandler(async (req,res) => {
    res.json({ message: "Current user information"});
});

module.exports = {registerUser,loginUser,currentUser};