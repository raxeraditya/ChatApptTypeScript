import express from "express";
//setup dotenv allways in Root
import dotenv from "dotenv";
import userRoutes from "./routes/users.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/connectDb.js";
dotenv.config();
const port = process.env.PORT || 4000;
//setup a app
const app = express();
//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.send("hey");
});
app.use("/api/users", userRoutes);
app.listen(port, () => {
    connectDb();
    console.log(`Example app listening on port ${port}`);
});
