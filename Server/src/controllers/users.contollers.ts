import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenandSetCookie from "../utils/Token.js";
import { TokenType } from "../types/TokenType.js";
import { loginUser, UserData } from "../types/UserType.js";
import mongoose from "mongoose";
interface AuthRequest extends Request {
  id?: mongoose.Schema.Types.ObjectId; // Define the id property
}

export const userRegister = async (req: AuthRequest, res: Response) => {
  try {
    const userData: UserData = await req.body;
    if (!userData) {
      return res.status(400).json({ message: "Please input data" });
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
    const allreadyUser = await User.findOne({ username });
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
      userId: newUser._id,
      userName: newUser.username,
      password: newUser.password,
      gender: newUser.gender,
      profilePhoto: newUser.profilePhoto,
    };
    console.log(tokendata);
    const token = await generateTokenandSetCookie(req, res, tokendata);
    if (!token) {
      return res.status(400).json({
        message: "your details are incorrect ot jenerate a token",
      });
    }
  } catch (error) {
    console.log("error something", error);
    return res.json({ message: "error while register a user" }).status(500);
  }
};

export const userLogin = async (req: AuthRequest, res: Response) => {
  try {
    const userData: loginUser = req.body;
    const { username, password } = userData;
    if (!userData) {
      return res.json({ message: "Please input data" }).status(400);
    }
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter your username or password" });
    }
    const userFind = await User.findOne({ username });
    if (!userFind) {
      return res
        .json({ message: "username is incorrect or not register" })
        .status(400);
    }
    const hashedPassword = userFind.password;
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.json({ message: "your password is wrong" }).status(400);
    }
    const tokendata: TokenType = {
      userId: userFind._id,
      userName: userFind.username,
      password: userFind.password,
      gender: userFind.gender,
      profilePhoto: userFind.profilePhoto,
    };
    // console.log("token data", tokendata);
    const token = generateTokenandSetCookie(req, res, tokendata);
    if (!token) {
      return res
        .status(400)
        .json({ message: "your details are incorrect ot jenerate a token" });
    }
  } catch (error) {
    console.log("error somethin is wrong but solve it", error);
    return res.json({ message: "user login error" }).status(500);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    return res.status(200).clearCookie("token").json({
      message: "logged out successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
export const getOtherUsers = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
