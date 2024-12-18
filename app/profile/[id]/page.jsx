"use client";

import Loader from "@components/Loader";
import Profile from "@components/Profile";
import { useSearchParams } from "@node_modules/next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserProfile = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const about = searchParams.get("about");
  const imgURL = searchParams.get("image");
  const createdAt = searchParams.get("createdAt");
  const [userPosts, setUserPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();

      setUserPosts(data.reverse());
      setLoading(false);
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  if (!session) router.push("/");

  if (Loading) {
    return (
      <div className="mt-[50%] sm:mt-[15%]">
        <Loader size="100px" color="rgb(2 132 199)" />
      </div>
    );
  }

  if (userPosts.length === 0) {
    return (
      <div className="head_text text-center">
        <h1 className="font-montserrat orange_gradient mt-20 sm:mt-30">
          {name} did not post anything yet!
        </h1>
      </div>
    );
  }
  return (
    <Profile
      name={name}
      about={about}
      image={imgURL}
      createdDate={createdAt}
      data={userPosts}
    />
  );
};

export default UserProfile;
