const mongoose = require("mongoose");

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

module.exports = mongoose.model("User",userModel);