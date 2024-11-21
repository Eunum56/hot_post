"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="mt-10">
        <h1 className="head_text font-satoshi">
          Please Sign In to{" "}
          <span className="blue_gradient font-palanquin">Explore</span>
        </h1>
      </div>
    );
  }
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="green_gradient text-center"> Accross the world</span>
      </h1>
      <Feed />
    </section>
  );
};

export default Home;
