"use client";
import Feed from "@components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetching, setFetching] = useState(true);
  const [Posts, setPosts] = useState([]);

  const fetchPost = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setPosts(data.reverse());
    setFetching(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="green_gradient text-center"> Accross the world</span>
      </h1>
      <Feed Posts={Posts} fetching={fetching} />
    </section>
  );
};

export default Home;
