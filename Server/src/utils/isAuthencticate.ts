import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Define the AuthRequest interface
export interface AuthRequest extends Request {
  id?: mongoose.Schema.Types.ObjectId;
}

// Modify the middleware to use proper return type
export const isAuthencticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token;
    console.log("......... token", token);
    
    if (!token) {
      res.status(400).json({ message: "please login firstly" });
      return;
    }
    
    const decodedData: any = jwt.verify(token, process.env.JWT_TOKEN as string);
    
    if (!decodedData) {
      res.status(400).json({ message: "you token has been modified" });
      return;
    }
    
    // Cast req to AuthRequest to add the id property
    (req as AuthRequest).id = decodedData.userId;
    console.log(".............docoded", decodedData.userId);
    console.log("getToken", token);
    
    next();
  } catch (error) {
    console.log("................error", error);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

export default isAuthencticate;