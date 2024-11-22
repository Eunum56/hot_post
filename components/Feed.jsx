"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
import { useSession } from "next-auth/react";

const PostList = ({ data, handleTagClicked }) => {
  return (
    <div className="post_layout ">
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
  const [fetching, setFetching] = useState(true);

  const [Posts, setPosts] = useState([]);

  const [SearchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPost = async () => {
    const response = await fetch("/api/post", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    const data = await response.json();

    setPosts(data.reverse());
    setFetching(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const filterPosts = (searchtext) => {
    const register = new RegExp(searchtext, "i");
    return Posts.filter(
      (item) =>
        register.test(item.creator.username) ||
        register.test(item.tags) ||
        register.test(item.post)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClicked = (tagname) => {
    setSearchText(tagname);

    const searchResult = filterPosts(tagname);
    setSearchedResults(searchResult);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="mt-10">
        <h1 className="head_text font-satoshi">
          Sign In to{" "}
          <span className="blue_gradient font-palanquin">Explore</span>
        </h1>
      </div>
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={preventDefault}>
        <input
          type="text"
          placeholder="Search..."
          value={SearchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {fetching ? (
        <div className="mt-20">
          <Loader size="100px" color="rgb(2 132 199)" />
        </div>
      ) : SearchText ? (
        <PostList data={searchedResults} handleTagClicked={handleTagClicked} />
      ) : (
        <PostList data={Posts} handleTagClicked={handleTagClicked} />
      )}
    </section>
  );
};

export default Feed;
