import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { AuthRequest } from "../types/userType.js";

export const isAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = tokenFromHeader || req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Please login first" });
      return;
    }

    const decodedData = jwt.verify(token, process.env.JWT_TOKEN as string) as {
      userId: string;
    };

    // Attach user ID to request
    (req as AuthRequest).id = new mongoose.Types.ObjectId(decodedData.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export { AuthRequest };

