"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostList = ({ data, handleTagClicked }) => {
  return (
    <div className="mt-10 post_layout ">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClicked={handleTagClicked}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [SearchText, setSearchText] = useState("");
  const [Posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();

      setPosts(data);
    };
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search..."
          value={SearchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PostList data={Posts} handleTagClicked={() => {}} />
    </section>
  );
};

export default Feed;
