import express from "express";
//setup dotenv allways in Root
import dotenv from "dotenv";
import userRoutes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import connectDb from "./utils/connectDb.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.send("hey");
});
app.use("/api", userRoutes);
app.listen(port, () => {
    connectDb();
    console.log(`Example app listening on port ${port}`);
});
