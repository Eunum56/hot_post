"use client";
import Feed from "@components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetching, setFetching] = useState(true);
  const [Posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="green_gradient text-center"> Across the world</span>
      </h1>
      <Feed Posts={Posts} fetching={fetching} />
    </section>
  );
};

export default Home;
