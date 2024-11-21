"use client";

import React from "react";

const Loader = ({ size, color }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="loader rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderWidth: "4px",
          borderColor: `${color}`,
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default Loader;
