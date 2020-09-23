import { createSlice } from '@reduxjs/toolkit';

// Generating search id so we can use it as a unique key in render
let idCounter = 1;

const searchesSlice = createSlice({
  name: 'searches',
  initialState: [],
  reducers: {
    pushSearch: (state, { payload }) => {
      state.push({ id: idCounter, ...payload });
      idCounter++;
    },
  },
});

/**
 * Action creators
 */
export const { pushSearch } = searchesSlice.actions;

/**
 * Export reducer
 */
export const searchesReducer = searchesSlice.reducer;
