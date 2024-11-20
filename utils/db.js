import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB is already Connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "hotpost",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        })

        isConnected = true
        console.log("MongoDB Connected")

    } catch (error) {
        console.log(error)
    }
}