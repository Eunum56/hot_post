import Post from "@models/post"
import { connectDB } from "@utils/db"


export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const post = await Post.findById(params.id).populate('creator');

        if (!post) {
            return new Response(JSON.stringify("Post doesn't exists"), { status: 404 })
        }

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new Response("Failed to load all posts", { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { post, tags } = await req.json();

    try {
        await connectDB();
        const ExistingPost = await Post.findById(params.id);

        if (!ExistingPost) {
            return new Response(JSON.stringify("Post doesn't exists to update"), { status: 404 })
        }

        ExistingPost.post = post;
        ExistingPost.tags = tags;

        await ExistingPost.save();

        return new Response(JSON.stringify(ExistingPost), { status: 200 })

    } catch (error) {
        // console.log(error.message)
        return new Response(JSON.stringify("Failed to Update post"), { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        await Post.findByIdAndRemove(params.id)

        return new Response(JSON.stringify("Post deleted sussessfully"), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Failed to delete post"), { status: 500 })
    }
}