import React from "react";

const Footer = () => {
  // Handler to open links in a new tab
  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 text-xs w-full text-white text-center bg-black space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
      <div className="flex space-x-4">
        <span className="text-gray-400">Connect with me:</span>
        <span
          onClick={() => openLink("https://github.com/avinashsingh108")}
          className="cursor-pointer text-blue-400 hover:underline"
        >
          GitHub
        </span>
        <span
          onClick={() => openLink("https://www.linkedin.com/in/avinashs46/")}
          className="cursor-pointer text-blue-400 hover:underline"
        >
          LinkedIn
        </span>
      </div>

      <span className="hidden sm:inline-block mx-2 text-gray-600">|</span>

      <div className="flex flex-wrap justify-center space-x-2">
        <span className="text-gray-400">Data powered by:</span>
        <span
          onClick={() => openLink("https://www.omdbapi.com/")}
          className="cursor-pointer text-blue-400 hover:underline"
        >
          OMDb API
        </span>
        <span
          onClick={() => openLink("https://trakt.docs.apiary.io/#")}
          className="cursor-pointer text-blue-400 hover:underline"
        >
          Trakt API
        </span>
        <span
          onClick={() => openLink("https://api.watchmode.com/docs/")}
          className="cursor-pointer text-blue-400 hover:underline"
        >
          Watchmode API
        </span>
      </div>
    </div>
  );
};

export default Footer;
