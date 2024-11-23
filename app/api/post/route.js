import Post from "@models/post";
import { connectDB } from "@utils/db";

export const GET = async (req) => {
    try {
        await connectDB();
        const posts = await Post.find({}).populate('creator');

        const headers = new Headers();
        headers.append('Cache-Control', 'no-store');

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        const headers = new Headers();
        headers.append('Cache-Control', 'no-store');

        return new Response("Failed to load all posts", {
            status: 500,
            headers: headers,
        });
    }
};
