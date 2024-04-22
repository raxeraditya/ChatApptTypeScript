const getTokenData = (req) => {
    const token = req.cookies.jwt;
    console.log("getToken", token);
};
export default getTokenData;
