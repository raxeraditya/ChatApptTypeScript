import jwt from "jsonwebtoken";
import cookieOPtionData from "../lib/CookeiOptions.js";
const generateTokenandSetCookie = async (req, res, tokendata) => {
    const token = jwt.sign(tokendata, process.env.JWT_TOKEN, {
        expiresIn: "1d",
    });
    if (!token) {
        return res
            .status(400)
            .json({ message: "while we create a token found some error" });
    }
    return res
        .status(200)
        .cookie("token", token, cookieOPtionData)
        .json({ message: "succesfully regsiter a user or login ser" });
};
export default generateTokenandSetCookie;
