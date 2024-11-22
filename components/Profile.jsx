//

import Image from "next/image";
import { useState } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
import { useSession } from "@node_modules/next-auth/react";
import { usePathname } from "@node_modules/next/navigation";

import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";

const Profile = ({
  userId,
  name,
  about,
  image,
  createdDate,
  data,
  handleEdit,
  handleDelete,
}) => {
  const [isUpdate, setIsUpdate] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newAbout, setNewAbout] = useState(about);
  const [currentAbout, setCurrentAbout] = useState(about);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const formattedDate = new Date(createdDate).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });

  const handleUpdateClick = () => {
    setIsUpdate(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const response = await fetch("/api/updateDesc", {
        method: "PATCH",
        body: JSON.stringify({
          desc: newAbout,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        setCurrentAbout(newAbout);
        setUpdateLoading(false);
        setIsUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsUpdate(true);
  };
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
          <h5 className="font-extrabold text-center text-base font-satoshi text-slate-600">
            {name}
          </h5>
          <h6 className="text-center text-sm text-slate-400">
            Joined on: {formattedDate}
          </h6>
        </div>
      </div>
      <div className="relative">
        {isUpdate ? (
          <div className="update_desc">
            {currentAbout}
            {session?.user.id === userId && pathName === "/profile" && (
              <div
                className="absolute right-0 top-0"
                onClick={handleUpdateClick}
              >
                <FaRegEdit />
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
              className="form_input"
            />
            <div className="flex-end mx-3 mb-5 gap-4">
              <p
                onClick={handleCancel}
                className="text-gray-500 text-sm cursor-pointer"
              >
                Cancel
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-1.5 mt-2 max-sm:px-2 text-sm rounded-full text-white bg-primary-blue"
              >
                {updateLoading ? (
                  <>
                    Updating... <Loader size="20px" color="white" />
                  </>
                ) : (
                  "Update"
                )}
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
