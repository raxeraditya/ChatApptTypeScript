import jwt from "jsonwebtoken";
const isAuthencticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("......... token", token);
        if (!token) {
            return res.status(400).json({ message: "please login firstly" });
        }
        const decodedData = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decodedData) {
            return res.status(400).json({ message: "you token has been modified" });
        }
        const userId = decodedData.userId;
        console.log(".............docoded", decodedData.userId);
        req.id = decodedData.userId;
        console.log("getToken", token);
        next();
    }
    catch (error) {
        console.log("................error", error);
        return res.status(500).json({ message: "internal server error" });
    }
};
export default isAuthencticate;
