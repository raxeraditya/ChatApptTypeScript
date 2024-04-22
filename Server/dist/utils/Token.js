import jwt from "jsonwebtoken";
const generateTokenandSetCookie = async (user) => {
    const token = await jwt.sign(user, process.env.JWT_TOKEN, {
        expiresIn: "1d",
    });
    console.log(token);
    return token;
};
export default generateTokenandSetCookie;
