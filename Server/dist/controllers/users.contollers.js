import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenandSetCookie from "../utils/Token.js";
import { LoginSchemaZod, SignupSchemaZod } from "../types/zodTypes.js";
export const userRegister = async (req, res) => {
    try {
        const userData = await req.body;
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
        const allreadyUser = await User.findOne({ username });
        if (allreadyUser) {
            return res.status(400).json({ message: "user Allready exists" });
        }
        //hassed
        const hashedPassword = await bcrypt.hash(password, 10);
        const malephoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femalephoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? malephoto : femalephoto,
        });
        const tokendata = {
            userId: newUser._id,
            userName: newUser.username,
            profilePhoto: newUser.profilePhoto,
            email: newUser.email,
            gender: newUser.gender,
        };
        console.log(tokendata);
        const token = await generateTokenandSetCookie(req, res, tokendata);
        if (!token) {
            return res.status(400).json({
                message: "your details are incorrect ot jenerate a token",
            });
        }
    }
    catch (error) {
        console.log("error something", error);
        return res.json({ message: "error while register a user" }).status(500);
    }
};
export const userLogin = async (req, res) => {
    try {
        const userData = req.body;
        const parsedInput = LoginSchemaZod.safeParse(userData);
        const { username, password } = userData;
        if (!parsedInput.success) {
            const data1 = parsedInput.error.formErrors;
            return res
                .status(400)
                .json({ message: "Please input data", data: data1 });
        }
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Please enter your username or password" });
        }
        const userFind = await User.findOne({ username });
        if (!userFind) {
            return res
                .status(400)
                .json({ message: "username is incorrect or not register" });
        }
        const hashedPassword = userFind.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordCorrect) {
            return res.json({ message: "your password is wrong" }).status(400);
        }
        const tokendata = {
            userId: userFind._id,
            userName: userFind.username,
            gender: userFind.gender,
            email: userFind.email,
        };
        // console.log("token data", tokendata);
        const token = generateTokenandSetCookie(req, res, tokendata);
        if (!token) {
            return res
                .status(400)
                .json({ message: "your details are incorrect to jenerate a token" });
        }
    }
    catch (error) {
        console.log("error somethin is wrong but solve it", error);
        return res.status(500).json({
            message: "internal server error",
        });
    }
};
export const logout = (req, res) => {
    try {
        return res.status(200).clearCookie("token").json({
            message: "logged out successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error",
        });
    }
};
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");
        return res
            .status(200)
            .json({ message: "find other user succesfully", data: otherUsers });
    }
    catch (error) {
        return res.status(500).json({
            message: "internal server error",
        });
        console.log(error);
    }
};
