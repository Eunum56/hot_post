import mongoose from "mongoose";


export const connectDB = async () => {
    let isConnected = false;

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
        })

        isConnected = true
        console.log("MongoDB Connected")

    } catch (error) {
        console.log("Mongodb error", error)
    }
}


