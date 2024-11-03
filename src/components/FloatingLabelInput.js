import React, { useState } from "react";

const FloatingLabelInput = ({ label, type }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={`absolute left-3 top-4 transition-all duration-200 ease-in-out pointer-events-none w-full ${
          isFocused || value
            ? "scale-75 -translate-x-9 -translate-y-3 text-gray-300"
            : "text-gray-400"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="px-4 pt-6 pb-2.5 text-sm leading-6 bg-slate-500 bg-opacity-30 w-full rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
};

export default FloatingLabelInput;
