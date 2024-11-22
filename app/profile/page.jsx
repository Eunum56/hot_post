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

      setPosts(data.reverse());
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

  if (!session) router.push("/");

  if (Loading) {
    return (
      <div className="mt-[50%] sm:mt-[15%]">
        <Loader size="100px" color="rgb(2 132 199)" />
      </div>
    );
  }
  return (
    <Profile
      userId={Posts[0].creator._id}
      name={Posts[0].creator.username}
      about={Posts[0].creator.description}
      image={Posts[0].creator.image}
      createdDate={Posts[0].creator.createdAt}
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
