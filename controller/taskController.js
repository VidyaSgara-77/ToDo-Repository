import express from "express";
import { Tasks } from "./models/taskModels.js";
import jwt from "jsonwebtoken";
import {User} from "./models/userModels.js";

export const createTask = async (req,res) => {
    const {title,description} = req.body;

    const {token} = req.cookies;
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
  
    const user = await User.findById({_id : decoded});
   
    const task = await Tasks.create({title,description,user : user._id});

    res.status(201).json({
        task
    });
}

export const getTasks  = async (req,res) => {
    try {
        const {token} = req.cookies;
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);

    const task = await Tasks.find({user : decoded});
    res.status(200).json({
        task
    });
        
    } catch (error) {
       throw new Error(error);
    }
}

export const updateTask = async (req,res) => {
   try {
    const task = await Tasks.findOne({_id : req.params.id});
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        task
    });
    
   } 
   catch (error) {
    throw new Error(error);
   }
}

export const deleteTask = async (req,res) => {
   try {
    const task = await Tasks.findOne({_id : req.params.id});
    task.isCompleted = !task.isCompleted;
    res.status(200).json({
        task
    });
    
   } 
   catch (error) {
    throw new Error(error);
   }
}

