import Post from "@models/post";
import { connectDB } from "@utils/db";

export const GET = async (req, { params }) => {
    try {
        const { id } = params;

        await connectDB();
        const posts = await Post.find({ creator: id }).populate("creator");

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new Response("Failed to fetch posts", { status: 500 });
    }
};
