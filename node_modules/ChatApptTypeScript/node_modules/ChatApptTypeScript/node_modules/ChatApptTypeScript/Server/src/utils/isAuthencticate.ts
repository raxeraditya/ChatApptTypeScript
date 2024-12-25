import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  id?: mongoose.Schema.Types.ObjectId; // Define the id property
}

const isAuthencticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log("......... token", token);
    if (!token) {
      return res.status(400).json({ message: "please login firstly" });
    }
    const decodedData: any = jwt.verify(token, process.env.JWT_TOKEN as string);
    if (!decodedData) {
      return res.status(400).json({ message: "you token has been modified" });
    }
    const userId = decodedData.userId;
    console.log(".............docoded", decodedData.userId);
    req.id = decodedData.userId;
    console.log("getToken", token);
    next();
  } catch (error) {
    console.log("................error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default isAuthencticate;
