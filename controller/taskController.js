const express = require("express");
const Tasks = require("./models/taskModels");
const jwt = require("jsonwebtoken");
const User = require("./models/userModels");

const createTask = async (req,res) => {
    const {title,description} = req.body;

    const {token} = req.cookies;
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
  
    const user = await User.findById({_id : decoded});
   
    const task = await Tasks.create({title,description,user : user._id});

    res.status(201).json({
        task
    });
}

const getTasks  = async (req,res) => {
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

const updateTask = async (req,res) => {
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

const deleteTask = async (req,res) => {
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

module.exports = {createTask,deleteTask,updateTask,getTasks}