"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, []);
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

  return (
    <Profile
      name="My"
      about="about"
      image="/Image/logo.svg"
      email="Email"
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
