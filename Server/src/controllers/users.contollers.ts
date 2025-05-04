import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenandSetCookie from "../utils/Token.js";
import { AuthResponse, TokenType } from "../types/tokenType.js";
import { AuthRequest, loginUserDataType, UserData } from "../types/userType.js";
import mongoose from "mongoose";
import { LoginSchemaZod, SignupSchemaZod } from "../types/zodTypes.js";

type loginUser = (
  req: AuthRequest, 
  res: Response
) => Promise<Response<AuthResponse, Record<string, any>>>;


export const userRegister = async (req: AuthRequest, res: Response) => {
  try {
    const userData: UserData = await req.body;
    if (!userData) {
      return res.status(400).json({ message: "Please input data" });
    }
    const parsedInput = SignupSchemaZod.safeParse(userData);
    if (!parsedInput.success) {
      const data1 = parsedInput.error.formErrors;
      console.log(data1);
      return res
        .json({ message: "Please input data", data: data1 })
        .status(400);
    }
    const { username, email, password, confirmPassword, gender } = userData;
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please input data username password" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "your password does not match" });
    }
    const allreadyUser = await User.findOne({ $and:[{username},{email}] });
    if (allreadyUser) {
      return res.status(400).json({ message: "user Allready exists" });
    }
    //hassed
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const malephoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femalephoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? malephoto : femalephoto,
    });

    const tokendata: TokenType = {
      userId: newUser._id as mongoose.Types.ObjectId,
      userName: newUser.username,
      profilePhoto: newUser.profilePhoto,
      email: newUser.email,
      gender: newUser.gender,
    };
    console.log(tokendata);
    const token = await generateTokenandSetCookie(res, tokendata);
    if (!token) {
      return res.status(400).json({
        message: "your details are incorrect ot jenerate a token",
      });
    }
  } catch (error) {
  res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin: loginUser = async (
  req: AuthRequest,
  res: Response
): Promise<Response<AuthResponse, Record<string, any>>> => {
  try {
    const userData:loginUserDataType  = req.body;
    const parsedInput = LoginSchemaZod.safeParse(userData);
    
    if (!parsedInput.success) {
      const data1 = parsedInput.error.formErrors;
      return res
        .status(400)
        .json({ message: "Please input data", data: data1 });
    }
    
    const { username, password, email } = userData;
    
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter your username or password" });
    }
    
    const userFind = await User.findOne({
      $and: [{ username: username }, { email: email }],
    });
    
    if (!userFind) {
      return res
        .status(400)
        .json({ message: "Username is incorrect or not registered" });
    }
    
    const hashedPassword = userFind.password;
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      hashedPassword
    );
    
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Your password is wrong" });
    }
    
    const tokendata: TokenType = {
      userId: userFind._id as mongoose.Types.ObjectId,
      userName: userFind.username,
      gender: userFind.gender,
      email: userFind.email,
    };
    
    const result = await generateTokenandSetCookie(res, tokendata);
    
    // If result is undefined (which shouldn't happen with the improved function), return an error
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to generate authentication token" });
    }
    
    // generateTokenandSetCookie now returns the Response object, so we return that directly
    return result;
    
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const logout = (req: Request, res: Response) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "logged out successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
export const getOtherUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res
      .status(200)
      .json({ message: "find other user succesfully", data: otherUsers });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};


export const authentication = (req:AuthRequest,res:Response)=>{
try {
  console.log(req.id)
  return res.status(200).json({message:"hey",id:req.id})
} catch (error) {
  return res.status(500).json({message:"Server Error"})
  
}
}
