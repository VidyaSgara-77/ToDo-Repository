import express from "express";
import {connectDb} from "./dbConnect/connectDB.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import taskRouter from "./router/taskRouter.js";

dotenv.config();

export const app = express();

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


app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

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