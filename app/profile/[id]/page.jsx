"use client";

import Loader from "@components/Loader";
import Profile from "@components/Profile";
import { useSearchParams } from "@node_modules/next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const about = searchParams.get("about");
  const imgURL = searchParams.get("image");
  const email = searchParams.get("email");
  const [userPosts, setUserPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();

      setUserPosts(data);
      setLoading(false);
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  if (Loading) {
    return (
      <div className="mt-[50%] sm:mt-[25%]">
        <Loader size="100px" color="rgb(6 182 212)" />
      </div>
    );
  }
  return (
    <Profile
      name={name}
      about={about}
      image={imgURL}
      email={email}
      data={userPosts}
    />
  );
};

export default UserProfile;
