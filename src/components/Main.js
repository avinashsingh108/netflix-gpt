import React, { useEffect, useState } from "react";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
import TrailerInfoShimmer from "./TrailerInfoShimmer";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [isMuteOn, setIsMuteOn] = useState(true);
  const [imdbId, setImdbId] = useState(null);
  const [urlId, setUrlId] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const navigate = useNavigate();

  const getTrailerImdbId = () => {
    const apiKey = process.env.REACT_APP_TRAKT_API_KEY;
    
    fetch("https://api.trakt.tv/movies/trending", {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((res) => setImdbId(res[0].movie.ids.imdb));
  };

  const movieTrailer = () => {
    const apiKey = process.env.REACT_APP_TRAKT_API_KEY;
    fetch("https://api.trakt.tv/movies/" + imdbId + "/videos", {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const youtubeTrailer = data.find(
          (video) =>
            video.type.toLowerCase() === "trailer" &&
            video.site.toLowerCase() === "youtube"
        );
        if (youtubeTrailer) {
          const url = new URL(youtubeTrailer.url);
          const videoId = url.searchParams.get("v");
          if (videoId) {
            setUrlId(videoId);
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const movieMetaData = () => {
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    fetch("https://www.omdbapi.com/?i=" + imdbId + "&apikey=" + apiKey)
      .then((res) => res.json())
      .then((res) => setMovieInfo(res));
  };

  useEffect(() => {
    getTrailerImdbId();
  }, []);

  useEffect(() => {
    if (imdbId) {
      movieTrailer();
      movieMetaData();
    }
  }, [imdbId]);

  return (
    <>
      <div className="absolute pt-[300px] px-4 md:px-14 lg:pt-[50vh] lg:px-20 xl:px-36 text-white space-y-2 lg:space-y-6 bg-gradient-to-b from-black from-5% via-transparent to-transparent w-full lg:h-screen z-10">
        {movieInfo ? (
          <>
            <div className="max-w-sm">
              <h1 className="text-xl font-semibold lg:text-4xl lg:font-bold mb-1 lg:mb-4">
                {movieInfo?.Title}
              </h1>
              <p className="max-lg:text-xs text-gray-300 mb-2 lg:mb-6">
                {movieInfo?.Plot}
              </p>
            </div>
            <div className="flex items-center gap-x-4 ">
              <button
                onClick={() => setIsMuteOn(!isMuteOn)}
                className="flex items-center max-lg:text-sm bg-white text-black rounded-lg px-4 py-2 lg:px-6 lg:py-3 font-semibold outline-none hover:bg-opacity-80 transition"
              >
                {isMuteOn ? (
                  <GoUnmute className="mr-2 lg:text-lg" />
                ) : (
                  <GoMute className="mr-2 lg:text-lg" />
                )}
                {isMuteOn ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={() => navigate("/info/" + imdbId)}
                className="flex items-center max-lg:text-sm bg-red-700 bg-opacity-60 outline-none text-white rounded-lg px-4 py-2 lg:px-6 lg:py-3 font-semibold hover:bg-opacity-90 transition"
              >
                <AiOutlineInfoCircle className="mr-2" />
                More Info
              </button>
            </div>
          </>
        ) : (
          <TrailerInfoShimmer />
        )}
      </div>
      <div className="lg:w-full lg:h-screen absolute lg:bg-gradient-to-r from-black from-5% via-transparent to-transparent"></div>
      {urlId && (
        <div className="w-full max-lg:pt-12">
          {/* <iframe
            key={isMuteOn ? "muted" : "unmuted"}
            className="w-full h-60 md:h-[450px] lg:h-screen border-b border-opacity-20 border-white"
            src={`https://www.youtube.com/embed/${urlId}?&autoplay=1&controls=0&rel=0&loop=1&playlist=${urlId}&${
              isMuteOn ? "mute=1" : ""
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
        </div>
      )}

      {!urlId && (
        <div className="text-center text-white">
          <h2 className="text-xl">Video Unavailable</h2>
        </div>
      )}
    </>
  );
};

export default Main;
