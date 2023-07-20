const mongoose = require("mongoose");

const connectDb = () => {
    console.log("Data Base Connection Successful");
    mongoose.connect(process.env.DB_CONNECTION_STRING);
};

module.exports = connectDb;