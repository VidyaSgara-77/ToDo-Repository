import express from 'express';
import { createTask, updateTask, getTasks, deleteTask } from '../controller/taskController.js';


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

export default router;