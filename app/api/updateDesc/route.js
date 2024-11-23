import { connectDB } from "@utils/db";
import User from "@models/user";

export const PATCH = async (req, res) => {
    try {
        const { userId, desc } = await req.json();

        await connectDB();

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404, headers: { 'Cache-Control': 'no-store' } });
        }
        existingUser.description = desc;

        await existingUser.save();

        return new Response(JSON.stringify({ message: "Description updated successfully" }), { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
};
