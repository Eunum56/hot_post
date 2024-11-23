import { connectDB } from "@utils/db";
import User from "@models/user";

export const PATCH = async (req, res) => {
    try {
        const { userId, desc } = await req.json();

        await connectDB();

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            const headers = new Headers(); headers.append('Cache-Control', 'no-store');
            return new Response(JSON.stringify("User not found"), { status: 404, headers: headers });
        }
        existingUser.description = desc;

        await existingUser.save();
        const headers = new Headers(); headers.append('Cache-Control', 'no-store');
        return new Response(JSON.stringify("Description updated successfully"), { status: 200, headers: headers });
    } catch (error) {
        console.error(error);
        const headers = new Headers(); headers.append('Cache-Control', 'no-store');
        return new Response(JSON.stringify("Internal Server Error"), { status: 500, headers: headers });
    }
};
