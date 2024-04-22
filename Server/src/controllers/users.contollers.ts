import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";
import generateTokenandSetCookie from "../utils/Token.js";
import isAuthencticate from "../utils/isAuthencticate.js";
import { TokenType } from "../types/TokenType.js";
import { loginUser, UserData } from "../types/UserType.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData: UserData = await req.body;
    if (!userData) {
      return res.json({ message: "Please input data" }).status(400);
    }
    const { username, email, password, confirmPassword, gender } = userData;
    if (!username || !email || !password || !confirmPassword) {
      return res
        .json({ message: "Please input data username password" })
        .status(400);
    }
    if (password !== confirmPassword) {
      return res.json({ message: "your password does not match" }).status(400);
    }
    const allreadyUser = await UserModel.findOne({ username });
    if (allreadyUser) {
      return res.json({ message: "user Allready exists" }).status(400);
    }
    //hassed
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const malephoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femalephoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? malephoto : femalephoto,
    });

    const tokendata: TokenType = {
      userId: newUser._id,
      userName: newUser.username,
    };
    console.log(tokendata);
    // const token = generateTokenandSetCookie(tokendata);
    const token = await jwt.sign(tokendata, process.env.JWT_TOKEN as string, {
      expiresIn: "1d",
    });
    // isAuthencticate(req, next);
    console.log("token data", token);

    return res
      .status(200)
      .cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .json({ message: "succesfully regsiter a user" });
  } catch (error) {
    console.log("error something", error);
    return res.json({ message: "error while register a user" }).status(500);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userData: loginUser = req.body;
    const { username, password } = userData;
    if (!userData) {
      return res.json({ message: "Please input data" }).status(400);
    }
    if (!username || !password) {
      return res
        .json({ message: "Please enter your username or password" })
        .status(400);
    }
    const userFind = await UserModel.findOne({ username });
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
    };
    console.log("token data", tokendata);
    // const token = generateTokenandSetCookie(tokendata);
    const token = jwt.sign(tokendata, process.env.JWT_TOKEN as string, {
      expiresIn: "1d",
    });

    const response = res
      .status(200)
      .cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .json({ message: "success to login" });
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error somethin is wrong but solve it", error);
    return res.json({ message: "user login error" }).status(500);
  }
};

export const getOtherUser = async (req: Request) => {
  try {
    const logedUser = req.id;
    const OtherUser = await UserModel.find({ _id: { $ne: logedUser } });
  } catch (error) {}
};
