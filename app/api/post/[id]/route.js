import Post from "@models/post";
import { connectDB } from "@utils/db";

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const post = await Post.findById(params.id).populate('creator');

        if (!post) {
            return new Response(JSON.stringify("Post doesn't exist"), { status: 404, headers: { 'Cache-Control': 'no-store' } });
        }

        return new Response(JSON.stringify(post), { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        return new Response("Failed to load post", { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
};

export const PATCH = async (req, { params }) => {
    const { post, tags } = await req.json();

    try {
        await connectDB();
        const ExistingPost = await Post.findById(params.id);

        if (!ExistingPost) {
            return new Response(JSON.stringify("Post doesn't exist to update"), { status: 404, headers: { 'Cache-Control': 'no-store' } });
        }

        ExistingPost.post = post;
        ExistingPost.tags = tags;

        await ExistingPost.save();

        return new Response(JSON.stringify(ExistingPost), { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        return new Response(JSON.stringify("Failed to update post"), { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        const post = await Post.findByIdAndRemove(params.id);

        if (!post) {
            return new Response(JSON.stringify("Post doesn't exist to delete"), { status: 404, headers: { 'Cache-Control': 'no-store' } });
        }

        return new Response(JSON.stringify("Post deleted successfully"), { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        return new Response(JSON.stringify("Failed to delete post"), { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
};
