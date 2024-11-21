"use client";
import Form from "@components/Form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");

  const router = useRouter();

  const [form, setform] = useState({
    post: "",
    tags: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const res = await fetch(`/api/post/${paramsId}`);
      const data = await res.json();

      setform({
        post: data.post,
        tags: data.tags,
      });
    };
    if (paramsId) {
      getPostDetails();
    }
  }, [paramsId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!paramsId) return alert("Post id not found!");

    try {
      const response = await fetch(`/api/post/${paramsId}`, {
        method: "PATCH",
        body: JSON.stringify({
          post: form.post,
          tags: form.tags,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      form={form}
      setform={setform}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
