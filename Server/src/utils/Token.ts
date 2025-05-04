import jwt from "jsonwebtoken";
import { AuthResponse, TokenType } from "../types/tokenType.js";
import { Response } from "express";
import cookieOptionData from "../lib/CookeiOptions.js";

// Improved token generation function with proper return type
const generateTokenandSetCookie = async (
  res: Response,
  tokendata: TokenType
): Promise<Response<AuthResponse, Record<string, any>>> => {
  try {
    const token = jwt.sign(tokendata, process.env.JWT_TOKEN as string, {
      expiresIn: "1d",
    });
    
    if (!token) {
      return res
        .status(400)
        .json({ message: "Failed to create authentication token" });
    }
    
    return res.status(200).cookie("token", token, cookieOptionData).json({
      message: "Successfully registered a user or login user",
      token,
      tokendata,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return res
      .status(500)
      .json({ message: "Error generating authentication token" });
  }
};

export default generateTokenandSetCookie;
