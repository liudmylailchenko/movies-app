import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoviesList } from './MoviesList';
import { Pagination } from '../../components/Pagination';
import { getMoviesList } from './moviesSlice';
import { Error } from '../../components/Error';
import { useSearch, useUpdateSearch } from '../../hooks/useSearch';

const ITEMS_PER_PAGE = 10;

export const MoviesListPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearch();
  const updateSearchParams = useUpdateSearch();

  const { list: movies, error, totalResults } = useSelector(
    (state) => state.movies,
  );

  const handlePageChange = useCallback(
    (page) => {
      updateSearchParams({ ...searchParams, page });
    },
    [updateSearchParams, searchParams],
  );

  useEffect(() => {
    dispatch(getMoviesList(searchParams));
  }, [dispatch, searchParams]);

  if (error && movies.length === 0) {
    return (
      <Error>No movies found. Please try to change your search criteria.</Error>
    );
  }

  return (
    <div>
      <MoviesList movies={movies} />
      <Pagination
        page={searchParams.page}
        totalPages={Math.ceil(totalResults / ITEMS_PER_PAGE)}
        onChange={handlePageChange}
      />
    </div>
  );
};
