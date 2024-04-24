import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateTokenandSetCookie from "../utils/Token.js";
export const userRegister = async (req, res) => {
    try {
        const userData = await req.body;
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
        const allreadyUser = await User.findOne({ username });
        if (allreadyUser) {
            return res.json({ message: "user Allready exists" }).status(400);
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
        const { username, password } = userData;
        if (!userData) {
            return res.json({ message: "Please input data" }).status(400);
        }
        if (!username || !password) {
            return res
                .json({ message: "Please enter your username or password" })
                .status(400);
        }
        const userFind = await User.findOne({ username });
        if (!userFind) {
            return res
                .json({ message: "username is incorrect or not register" })
                .status(400);
        }
        const hashedPassword = userFind.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordCorrect) {
            return res.json({ message: "your password is wrong" }).status(400);
        }
        const tokendata = {
            userId: userFind._id,
            userName: userFind.username,
        };
        // console.log("token data", tokendata);
        const token = generateTokenandSetCookie(req, res, tokendata);
        if (!token) {
            return res
                .status(400)
                .json({ message: "your details are incorrect ot jenerate a token" });
        }
    }
    catch (error) {
        console.log("error somethin is wrong but solve it", error);
        return res.json({ message: "user login error" }).status(500);
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
    }
};
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");
        return res.status(200).json(otherUsers);
    }
    catch (error) {
        console.log(error);
    }
};
