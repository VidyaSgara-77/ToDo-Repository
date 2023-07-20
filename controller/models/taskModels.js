import mongoose from "mongoose";

const taskModel =  mongoose.Schema ( { 
   
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    user : {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User" ,
         required : true
        },

    isCompleted : {
        type : Boolean,
        default : false
    },

},   {
    timestamps : true
})

export const Tasks = mongoose.model("Tasks",taskModel);