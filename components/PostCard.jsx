"use client";
import Image from "next/image";

const PostCard = ({ post, handleTagClicked, handleEdit, handleDelete }) => {
  return (
    <div className="post_card">
      <div className="flex flex-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="Profile Image"
            className="rounded-full object-contain"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-md text-gray-700">{post.post}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <p
            className="font-montserrat font-bold text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClicked && handleTagClicked(tag)}
            key={tag}
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
