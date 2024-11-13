import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    moviesByGenre: {},
  },
  reducers: {
    addMovies: (state, action) => {
      const { genre, movies } = action.payload;
      state.moviesByGenre[genre] = movies;
    },
  },
});

export const { addMovies } = movieSlice.actions;
export default movieSlice.reducer;
