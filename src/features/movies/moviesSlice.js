import { createSlice } from '@reduxjs/toolkit';
import qs from 'querystring';
import { apiCall } from '../../utils/apiCall';
import { history } from '../../utils/history';

// Parse query params from location
// making sure we done include leading `?`
const searchParams = qs.parse(history.location.search.replace(/^\?/, ''));

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    loading: false,
    error: null,
    list: [],
    single: null,
    searchParams: {
      title: searchParams.title || '',
      type: searchParams.type || '',
      year: searchParams.year || '',
      page: parseInt(searchParams.page) || 1,
    },
    totalResults: 0,
  },

  reducers: {
    updateSearchParams: (state, { payload }) => {
      state.searchParams = { ...state.searchParams, ...payload };
    },
    getListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getListSuccess: (state, { payload }) => {
      state.loading = false;
      state.list = payload.movies;
      state.totalResults = payload.totalResults;
    },
    getListFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getSingleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleSuccess: (state, { payload }) => {
      state.loading = false;
      state.single = payload;
    },
    getSingleFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

/**
 * Action creators
 */
const {
  updateSearchParams,
  getListStart,
  getListSuccess,
  getListFailure,
  getSingleStart,
  getSingleSuccess,
  getSingleFailure,
} = moviesSlice.actions;

/**
 * Fetch list of movies by provided search criteria
 */
export const getMoviesList = (params = {}) => {
  return async (dispatch, getState) => {
    dispatch(updateSearchParams(params));
    dispatch(getListStart());

    try {
      const { title, type, year, page } = getState().movies.searchParams;

      // Since `title` is a required param, no need to update
      // url when it's not provided
      if (title) {
        history.push(`/?${qs.stringify({ title, type, year, page })}`);
      }

      const response = await apiCall.request({
        params: {
          s: title,
          y: year,
          type,
          page,
        },
      });

      // Since API always returns status 200,
      // we check if there is error in response and
      // throw an exception manually
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Oops! Something went wrong.');
      }

      const { Search, totalResults } = response.data;

      dispatch(
        getListSuccess({
          movies: Search,
          totalResults: parseInt(totalResults, 10),
        }),
      );
    } catch (error) {
      dispatch(getListFailure(error.toString()));
    }
  };
};

/**
 * Fetch movie by id
 */
export const getMovie = (id) => {
  return async (dispatch) => {
    dispatch(getSingleStart());

    try {
      const response = await apiCall.request({ params: { i: id } });

      if (response.data.Response === 'False') {
        throw new Error(response.data.Error || 'Oops! Something went wrong.');
      }

      dispatch(getSingleSuccess(response.data));
    } catch (error) {
      dispatch(getSingleFailure(error.toString()));
    }
  };
};

/**
 * Export reducer
 */
export const moviesReducer = moviesSlice.reducer;
