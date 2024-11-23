import Post from "@models/post"
import { connectDB } from "@utils/db"

export const GET = async (req, res) => {
    try {
        await connectDB()
        const posts = await Post.find({}).populate('creator');

        return new Response(JSON.stringify(posts), { status: 200, headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
        return new Response("Failed to load all posts", { status: 500, headers: { 'Cache-Control': 'no-store' } })
    }
}