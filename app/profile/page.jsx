"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-store",
          },
        });
        const data = await response.json();
        setPosts(data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      await fetch(`/api/post/${post._id.toString()}`, {
        method: "DELETE",
        headers: {
          "Cache-Control": "no-store",
        },
      });
      const FilteredPosts = Posts.filter((p) => p._id !== post._id);
      setPosts(FilteredPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (Loading) {
    return (
      <div className="mt-[50%] sm:mt-[15%]">
        <Loader size="100px" color="rgb(2 132 199)" />
      </div>
    );
  }
  if (Posts.length === 0) {
    return (
      <div className="head_text text-center orange_gradient">
        <h1 className="mt-20 sm:mt-30 font-montserrat">
          Create a post to view profile
        </h1>
      </div>
    );
  }
  return (
    <Profile
      userId={Posts[0]?.creator?._id}
      name={Posts[0]?.creator?.username}
      about={Posts[0]?.creator?.description}
      image={Posts[0]?.creator?.image}
      createdDate={Posts[0]?.creator?.createdAt}
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
