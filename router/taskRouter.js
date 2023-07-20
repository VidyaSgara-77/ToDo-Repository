const express = require('express');
const { createTask, updateTask, getTasks, deleteTask } = require('../controller/taskController');
const jwt = require("jsonwebtoken");

const router = express.Router();

const isAuthenticated = async (req,res,next) => {
    
    const {token} = req.cookies;
    if (token) {
        next();
    } 
        else {
            res.status(403).json({
                message : "Log In First"
            });
        }
}

router.route("/my").get(isAuthenticated,getTasks);
router.route("/new").post(isAuthenticated,createTask);
router.route("/:id").put(isAuthenticated,updateTask);
router.route("/:id").delete(isAuthenticated,deleteTask);

module.exports = router;