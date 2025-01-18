import React, { useEffect, useState } from "react";
import Header from "./Header";
import run from "../utils/gemini";
import MovieCard from "./MovieCard";
import { FaSearch } from "react-icons/fa";
import CardShimmer from "./CardShimmer";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [ids, setIds] = useState([]);
  const user = useSelector((store) => store.user);
  const [searchingIds, setSearchingIds] = useState(false);
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const handleSearch = async (event) => {
    event.preventDefault();
    setIds([]);
    setSearchTitle("");
    if (searchQuery.trim()) {
      setSearchClicked(true);
      try {
        const result = await run(searchQuery);
        let cleanResult = result;

        if (typeof result === "string") {
          cleanResult = result.replace(/```json|```/g, "").trim();
        }

        const parsedResult =
          typeof cleanResult === "string"
            ? JSON.parse(cleanResult)
            : cleanResult;

        setSearchTitle(parsedResult[0]);

        if (parsedResult.length > 1) {
          await fetchMovieData(parsedResult);
        }
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setSearchClicked(false);
      }
    }
  };

  const fetchMovieData = async (movies) => {
    try {
      setSearchingIds(true);
      const movieData = await Promise.all(
        movies.slice(1).map((movie) =>
          fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
            .then((res) => res.json())
            .catch((error) =>
              console.error("Error fetching movie data:", error)
            )
        )
      );

      const validMovieData = movieData.filter((data) => data && data.imdbID);
      setIds(validMovieData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSearchingIds(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-categoriesbg text-white flex flex-col items-center pt-6 md:pt-24">
        <div className="w-full max-w-4xl mt-10 p-4 max-md:px-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Type a genre or mood to explore…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              maxLength={500}
              className="flex-grow py-2 px-4 rounded-l-lg outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 rounded-r-lg outline-none text-white font-semibold hover:bg-red-700 transition-colors"
            >
              <FaSearch
                className={`${searchClicked && "animate-pulse"} text-lg`}
              />
            </button>
          </form>
        </div>
        {searchClicked && !searchingIds && (
          <p className="text-gray-400 mt-3 md:mt-6 text-lg font-medium">
            Analyzing the user input...
          </p>
        )}
        {searchTitle && (
          <p className="text-lg font-medium md:font-semibold mb-4 mt-6 md:mt-10 px-4 max-w-4xl text-center">
            {searchTitle}
          </p>
        )}
        {searchClicked && searchingIds && (
          <div className="mt-6">
            <CardShimmer count={12} val={6} />
          </div>
        )}

        <div className="w-full max-w-5xl p-8 md:p-4">
          {ids?.length > 0 ? (
            <>
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {ids?.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    query={movie.imdbID}
                    parameter="i"
                  />
                ))}
              </div>
            </>
          ) : (
            !searchClicked &&
            !searchTitle && (
              <div className="text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-400">
                  Nothing here yet...
                </h2>
                <p className="text-gray-500 mt-2">
                  Enter a title or description above to get movie
                  recommendations.
                </p>
              </div>
            )
          )}
        </div>
        <CardShimmer />
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
