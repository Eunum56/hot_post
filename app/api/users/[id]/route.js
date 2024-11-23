import Post from "@models/post";
import { connectDB } from "@utils/db";

export const GET = async (req, { params }) => {
    try {
        const { id } = params;

        await connectDB();
        const posts = await Post.find({ creator: id }).populate("creator");
        const headers = new Headers(); headers.append('Cache-Control', 'no-store');

        return new Response(JSON.stringify(posts), { status: 200, headers: headers });
    } catch (error) {
        console.error("Error fetching posts:", error);
        const headers = new Headers(); headers.append('Cache-Control', 'no-store');
        return new Response("Failed to fetch posts", { status: 500, headers: headers });
    }
};
