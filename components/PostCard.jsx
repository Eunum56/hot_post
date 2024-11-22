"use client";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@node_modules/next-auth/react";
import { usePathname, useRouter } from "@node_modules/next/navigation";
import Loader from "./Loader";

const PostCard = ({ post, handleTagClicked, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);

  const postDate = new Date(post.creator.createdAt).toLocaleDateString(
    "en-US",
    { dateStyle: "medium" }
  );

  const toggleMenu = () => setShowMenu(!showMenu);

  const openDeleteDialogBox = () => setDeleteDialog(true);
  const handleCloseDeleteDialog = () => setDeleteDialog(false);
  const handleConfirmDeleteDialog = async () => {
    setIsDeleting(true);
    const deleted = await handleDelete();
    if (deleted) {
      setIsDeleting(false);
      setDeleteDialog(false);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(
      `/profile/${post.creator._id}?name=${post.creator.username}&image=${post.creator.image}&about=${post.creator.description}&createdAt=${post.creator.createdAt}`
    );
  };

  return (
    <div className="post_card relative bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="Profile Image"
            className="rounded-full object-contain"
            width={35}
            height={35}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-sm text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-xs text-gray-500">
              Posted on: {postDate}
            </p>
          </div>
        </div>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={toggleMenu}
            >
              &#8226;&#8226;&#8226;
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-50 border rounded shadow-md">
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    handleEdit();
                  }}
                >
                  Edit <FaEdit />
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                    openDeleteDialogBox();
                  }}
                >
                  Delete <MdDelete />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="my-4 font-satoshi text-md text-gray-700">{post.post}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.split(" ").map((tag, index) => (
          <p
            key={index}
            className="font-montserrat font-bold text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClicked && handleTagClicked(tag)}
          >
            {tag}
          </p>
        ))}
      </div>
      {deleteDialog && (
        <div className="fixed inset-0 flex-center bg-black/50 z-50">
          <div className="bg-slate-50 rounded-lg p-4 shadow-lg w-80">
            <h3 className="font-bold font-montserrat text-sm sm:text-xl">
              Confirm Delete
            </h3>
            <p className="text-gray-500 my-3 text-xs sm:text-lg">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-inter text-xs sm:text-lg hover:bg-gray-300"
                onClick={handleCloseDeleteDialog}
              >
                Cancel <MdOutlineCancel />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-inter rounded-md text-xs sm:text-lg hover:bg-red-600"
                onClick={handleConfirmDeleteDialog}
              >
                {isDeleting ? (
                  <>
                    Deleting... <Loader size="15px" color="white" />
                  </>
                ) : (
                  <>
                    Delete <MdDelete />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
