"use client";
import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setform] = useState({
    post: "",
    tags: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          post: form.post,
          userId: session?.user.id,
          tags: form.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  if (!session) router.push("/");
  return (
    <Form
      type="Create"
      form={form}
      setform={setform}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
