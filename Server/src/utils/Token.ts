import jwt from "jsonwebtoken";
import { TokenType } from "../types/TokenType.js";

const generateTokenandSetCookie = async (user: TokenType) => {
  const token = await jwt.sign(user, process.env.JWT_TOKEN as string, {
    expiresIn: "1d",
  });
  console.log(token);
  return token;
};

export default generateTokenandSetCookie;
