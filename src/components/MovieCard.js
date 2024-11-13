import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardShimmer from "./CardShimmer";

const MovieCard = ({ query, parameter }) => {
  const [cardData, setCardData] = useState(null);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  
  const movieData = () => {
    fetch(
      "https://www.omdbapi.com/?" +
        parameter +
        "=" +
        query +
        "&apikey=" +
        apiKey
    )
      .then((res) => res.json())
      .then((res) => setCardData(res));
  };
  useEffect(() => {
    movieData();
  }, []);

  const handleClick = () => {
    navigate("/info/" + query);
  };

  if (!cardData || !cardData.Poster) return <CardShimmer count={1} val={1} />;
  if (cardData.Poster === "N/A") return;
  return (
    <div className="flex-shrink-0 cursor-pointer" onClick={handleClick}>
      <img
        className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 object-cover rounded-md"
        src={cardData?.Poster}
        alt="Poster"
      />
    </div>
  );
};

export default MovieCard;
