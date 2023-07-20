import express from "express";
import { getUser, registerUser, logUserIn, logUserOut } from "../controller/userController.js";


const router = express.Router();

const isAuthenticated = (req,res,next) => {
    const {token} = req.cookies;
    if (token) {
        next();
    }
        else {
            res.json({message : "Log In First"});
        }
}

router.route("/info").get(isAuthenticated,getUser);
router.route("/register").post(registerUser);
router.route("/login").post(logUserIn);
router.route("/logout").get(isAuthenticated,logUserOut);

export default router;