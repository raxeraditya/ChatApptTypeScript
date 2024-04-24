import express, { Request, Response, Application } from "express";
//setup dotenv allways in Root
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/connectDb.js";

dotenv.config();
const port = process.env.PORT || 4000;
const app: Application = express();
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("hey");
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`);
});
