const express = require("express");
const connectDb = require("./dbConnect/connectDB");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.ALLOWED_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true,
}));


app.use("/api/v1/users",require("./router/userRouter"));
app.use("/api/v1/tasks",require("./router/taskRouter"));

app.listen(port,() => {
    console.log(`App Running At ${port} on ${process.env.DEV_ENV} Mode` );
});

app.use((req,res,next) => {
    res.status(404).json({
        success : false,
        message : "Error Occured"
    });
})

connectDb();