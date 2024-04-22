const isAuthencticate = (req, next) => {
    const token = req.cookies.jwt;
    console.log("getToken", token);
    next();
};
export default isAuthencticate;
