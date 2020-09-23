import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from '../features/movies/moviesSlice';
import { searchesReducer } from '../features/searches/searchesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    searches: searchesReducer,
  },
});
