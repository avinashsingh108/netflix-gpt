import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import MetaData from "./MetaData";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [trailerFetched, setTrailerFetched] = useState(false);
  const [infoFetched, setInfoFetched] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const apiKey = process.env.REACT_APP_TRAKT_API_KEY;
  const movieTrailer = () => {
    fetch("https://api.trakt.tv/movies/" + id + "/videos", {
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
            setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
          }
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setTrailerFetched(true));
  };

  const movieMetaData = () => {
    fetch("https://www.omdbapi.com/?i=" + id + "&apikey=bc0f583c")
      .then((res) => res.json())
      .then((res) => setMovieInfo(res))
      .finally(() => setInfoFetched(true));
  };

  useEffect(() => {
    movieTrailer();
    movieMetaData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      {!infoFetched || !trailerFetched ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
          <h1 className="text-xl md:text-3xl font-semibold mb-4 animate-pulse">
            Loading, please wait...
          </h1>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-red-600 border-solid"></div>
          </div>
        </div>
      ) : (
        <div className="px-2 md:px-10 lg:px-40 bg-categoriesbg text-white min-h-screen">
          <div className="container mx-auto">
            {trailerUrl ? (
              <div className=" pt-16 lg:pt-28">
                <iframe
                  className=" w-full h-60 md:h-96 lg:h-screen"
                  src={trailerUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              trailerFetched && (
                <div className="pt-28">
                  <h1 className="bg-black text-center text-xl p-8 ">
                    Trailer not available
                  </h1>
                </div>
              )
            )}
            {movieInfo && (
              <div className="py-8 px-2 bg-categoriesbg rounded-lg text-gray-800 dark:text-gray-100 w-full mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-3">
                  <span>{movieInfo.Title}</span>
                </h1>
                <p className="sm:text-lg mb-6">{movieInfo.Plot}</p>

                <div className="gap-y-4 lg:mt-14 gap-x-32 flex flex-wrap">
                  <MetaData title="Year" value={movieInfo.Year} />
                  <MetaData title="Genre" value={movieInfo.Genre} />
                  <MetaData title="Director" value={movieInfo.Director} />
                  <MetaData title="Writer" value={movieInfo.Writer} />
                  <MetaData title="Actors" value={movieInfo.Actors} />
                  <MetaData title="Runtime" value={movieInfo.Runtime} />
                  <MetaData title="Language" value={movieInfo.Language} />
                  <MetaData title="Country" value={movieInfo.Country} />
                  <MetaData title="Awards" value={movieInfo.Awards} />
                  <MetaData title="Box Office" value={movieInfo.BoxOffice} />

                  {movieInfo.Ratings && movieInfo.Ratings.length > 0 && (
                    <div className="">
                      <span className="text-gray-400">Ratings:</span>

                      <ul className="">
                        {movieInfo.Ratings.map((rating, index) => (
                          <li key={index}>
                            {rating.Source}: {rating.Value}
                          </li>
                        ))}
                        <li key="imdb">IMDb: {movieInfo.imdbRating}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
