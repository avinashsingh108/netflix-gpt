import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../store/movieSlice";
import CardShimmer from "./CardShimmer";
import "../style/scrollBar.css";

const MovieCategories = () => {
  const genres = [
    { id: 1, name: "Action" },
    { id: 18, name: "War" },
    { id: 11, name: "Horror" },
    { id: 15, name: "Science Fiction" },
  ];

  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.moviesByGenre);
  const apiKey = process.env.REACT_APP_WATCHMODE_API_KEY;
  useEffect(() => {
    genres.forEach(({ id, name }) => {
      if (!movieData[name]) {
        fetch(
          `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&genres=` +
            id
        )
          .then((res) => res.json())
          .then((data) =>
            dispatch(addMovies({ genre: name, movies: data.titles }))
          );
      }
    });
  }, []);

  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-40 bg-categoriesbg space-y-8 py-4 lg:py-10 max-lg:mt-16">
      {genres.map(({ name }) => (
        <div key={name}>
          <h2 className="md:text-xl font-medium text-white capitalize mb-2">
            {name} Movies
          </h2>
          {movieData[name] && movieData[name].length > 0 ? (
            <div className="flex overflow-x-auto gap-2 horizontal-scroll">
              {movieData[name].slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} query={movie.imdb_id} parameter="i" />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <CardShimmer count={7} val={7} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieCategories;
