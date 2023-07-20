const express = require("express");
const { getUser, registerUser, logUserIn, logUserOut } = require("../controller/userController");


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

module.exports = router;