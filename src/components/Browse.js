import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import MovieCategories from "./MovieCategories";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="bg-black">
      <Header />
      <div className="h-96 lg:min-h-screen">
        <Main />
      </div>
      <MovieCategories />
      <Footer />
    </div>
  );
};

export default Browse;
