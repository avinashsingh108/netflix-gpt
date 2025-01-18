import React from "react";

const CardShimmer = ({ count, val }) => {
  return (
    <div
      className={`grid grid-cols-3 md:grid-cols-${val} lg:grid-cols-${val} gap-4`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 rounded-md animate-pulse bg-gray-700"
        ></div>
      ))}
    </div>
  );
};

export default CardShimmer;
