import { Schema, model, models } from "mongoose"


const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: String,
        required: [true, "Post description is required"]
    },
    tags: {
        type: [String],
        required: [true, "Tags are required"]
    },
    reactions: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        }
    },
    comments: {
        text: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
})

const Post = models.Post || model("Post", PostSchema);

export default Post;