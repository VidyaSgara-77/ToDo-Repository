import  express from "express";
import { User } from "./models/userModels.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

export const getUser = async (req,res) => {
    const token = req.cookies.token;
    const unsignedtoken = await jwt.decode(token,process.env.JWT_TOKEN);
    const user = await User.findOne({_id : unsignedtoken});
    res.json({user});

}


export const registerUser = async (req,res) => {
   try {

    const {name,email,password} = req.body;

    const findEmail = await User.findOne({email});

    if (findEmail) return res.json({message : "User Already Exists"});

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    const user = await User.create({name,email,password : hashedPassword});


    res.status(201).json ({
        message : "User Created Succesfully!! You Can now Log In"
    });
    
   } catch (error) {
        throw new Error(error);
   }

}

export const logUserIn = async (req,res) => {
    try {

    const {email,password} = req.body;
  
    const user = await User.findOne({email : email})
    if (!user) return res.json("User Email Doesn't Exist");
    const hashedPassword = user.password;
    
    const isMatched = await bcrypt.compare(req.body.password,hashedPassword);
    

    if (!isMatched) return res.json({
        message : "Password Wrong or User does not exist"
    });

    const signedToken = await jwt.sign(user._id.toJSON(),process.env.JWT_TOKEN);


    res.status(200).cookie("token",signedToken,{
        HTTPOnly : true,
        expires : new Date (Date.now() + 15*60*1000),
        sameSite : process.env.DEV_ENV == "Development" ? "lax" : "none",
        secure : process.env.DEV_ENV == "Development" ? false : true

    }).json({
        message : "User Logged In"
    });   
    } 
    catch (error) {
        throw new Error(error);
        
    }
} 


export const logUserOut =  (req,res) => {
    res.cookie("token","",{
        expires : new Date (Date.now()),
        sameSite : process.env.DEV_ENV == "Development" ? "lax" : "none",
        secure : process.env.DEV_ENV == "Development" ? false : true
    });

    res.json({
        message : "User Logged Out Successfully"
    });
}

 