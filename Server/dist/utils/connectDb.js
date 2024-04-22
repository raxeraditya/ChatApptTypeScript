import mongoose from "mongoose";
const connectDb = async () => {
    try {
        const { connections } = await mongoose.connect(process.env.MONGO_URI);
        console.log("connect db");
    }
    catch (error) {
        console.log(error, "error wile connecting");
    }
};
export default connectDb;
