"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Loader from "@components/Loader";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`);
      const data = await response.json();

      setPosts(data);
      setLoading(false);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, [session?.user.id]);
  const handleEdit = async (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      await fetch(`/api/post/${post._id.toString()}`, {
        method: "DELETE",
      });

      const FilteredPosts = Posts.filter((p) => p._id !== post._id);
      setPosts(FilteredPosts);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  if (Loading) {
    return (
      <div className="mt-[50%] sm:mt-[25%]">
        <Loader size="100px" color="rgb(52 211 153)" />
      </div>
    );
  }

  return (
    <Profile
      name={Posts[0].creator.username}
      about={Posts[0].creator.description}
      image={Posts[0].creator.image}
      email={Posts[0].creator.email}
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
