import { IoIosCreate } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";

import Link from "next/link";
import React from "react";

const Form = ({ type, form, setform, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full felx-start">
      <h1 className="cu_text text-left">
        <span className="orange_gradient">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share accross the world
      </p>

      <form
        className="mt-8 flex flex-col glassmorphism w-full max-w-2xl gap-5"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-montserrat font-semibold text-base text-gray-700">
            Post details
          </span>

          <textarea
            value={form.post}
            onChange={(e) => setform({ ...form, post: e.target.value })}
            placeholder="Write your post..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-montserrat font-semibold text-base text-gray-700">
            Tags
          </span>

          <input
            value={form.tags}
            onChange={(e) => setform({ ...form, tags: e.target.value })}
            placeholder="Tags..."
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-1.5 text-sm rounded-full text-white bg-primary-blue"
          >
            {submitting ? (
              <>
                {`${type}...`} <GrUpdate />
              </>
            ) : (
              <>
                {type} <IoIosCreate />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
