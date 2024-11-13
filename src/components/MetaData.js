import React from "react";

const MetaData = ({ title, value }) => {
  return (
    <p className="flex flex-col items-start w-48 ">
      <span className="max-sm:text-sm text-gray-400">{title}</span>
      <span className="text-white sm:text-lg">
        {value
          ? value.endsWith("–")
            ? value.slice(0, -1) + " – Present"
            : value
          : "N/A"}
      </span>
    </p>
  );
};

export default MetaData;
