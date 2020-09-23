import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoviesList } from './MoviesList';
import { Pagination } from '../../components/Pagination';
import { getMoviesList } from './moviesSlice';

const ITEMS_PER_PAGE = 10;

export const MoviesListPage = () => {
  const dispatch = useDispatch();
  const { list: movies, error, searchParams, totalResults } = useSelector(
    (state) => state.movies,
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(getMoviesList({ page }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getMoviesList());
  }, [dispatch]);

  if (error) {
    return <span>{error}</span>;
  }

  return movies.length > 0 ? (
    <>
      <MoviesList movies={movies} />
      <Pagination
        page={searchParams.page}
        totalPages={Math.ceil(totalResults / ITEMS_PER_PAGE)}
        onChange={handlePageChange}
      />
    </>
  ) : (
    <span>No movies found. Please improve your search params.</span>
  );
};
