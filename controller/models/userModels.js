import mongoose from "mongoose";

const userModel = mongoose.Schema ({
   userId : {
    type : mongoose.Schema.Types.ObjectId
   },
    name : {
        type : String,
        require : true
    },

    email : {
        type : String,
        require : true
    },

    password : {
        type : String,
        require : true
    },

    
});

export const User = mongoose.model("User",userModel);