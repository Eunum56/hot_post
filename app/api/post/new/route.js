import Post from "@models/post";
import { connectDB } from "@utils/db";

export const POST = async (req, res) => {
    const { userId, post, tags } = await req.json()

    try {
        await connectDB()
        const tagsArray = tags.split(" ");
        const newPost = new Post({
            creator: userId,
            post,
            tags: tagsArray
        })
        console.log(typeof tags)
        await newPost.save()

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 })
    }
}