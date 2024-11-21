import Link from "@node_modules/next/link";
import Image from "next/image";
import { useState } from "react";
import PostCard from "./PostCard";

const Profile = ({
  name,
  about,
  image,
  email,
  data,
  handleEdit,
  handleDelete,
}) => {
  const [isUpdate, setIsUpdate] = useState(true);

  const handleUpdate = () => {};

  return (
    <section className="w-full">
      <div className="flex-center flex-col md:flex-row gap-2">
        <div>
          <Image
            src={image}
            alt="profile"
            className="rounded-full object-contain"
            height={60}
            width={60}
          />
        </div>
        <div>
          <h5 className="font-extrabold text-base text-slate-600">{name}</h5>
          <h6 className="email">{email}</h6>
        </div>
      </div>
      <div className="about">
        {isUpdate ? (
          <div className="update_desc">{about}</div>
        ) : (
          <form>
            <input
              type="text"
              value={about}
              onClick={handleUpdate}
              className="form_input"
            />
            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href="/profile" className="text-gray-500 text-sm">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUpdate}
                className="px-5 py-1.5 mt-2 max-sm:px-2 text-sm rounded-full text-white bg-primary-blue"
              >
                {isUpdate ? "Updateing" : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="mt-6 post_layout ">
        {data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
