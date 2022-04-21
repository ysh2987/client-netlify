import { createSlice } from '@reduxjs/toolkit';
import fetchUserByPosts from './postsThunk';

const initialState = {
  originalData: null,
  filterData: null,
  loading: false,
  error: false,
  sportsTypes: [0, 1, 2, 3, 4, 5, 6],
  cityTypes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  sortType: 'recently',
  recruit: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sportsFilter: (state, action) => {
      if (state.sportsTypes.length === 7) {
        state.sportsTypes = [action.payload];
      } else if (!state.sportsTypes.includes(action.payload)) {
        state.sportsTypes.push(action.payload);
      } else if (state.sportsTypes.includes(action.payload)) {
        state.sportsTypes = state.sportsTypes.filter(
          (el) => el !== action.payload,
        );
        if (!state.sportsTypes.length) {
          state.sportsTypes = initialState.sportsTypes;
        }
      }
    },
    cityFilter: (state, action) => {
      if (state.cityTypes.length === 15) {
        state.cityTypes = [action.payload];
      } else if (!state.cityTypes.includes(action.payload)) {
        state.cityTypes.push(action.payload);
      } else if (state.cityTypes.includes(action.payload)) {
        state.cityTypes = state.cityTypes.filter((el) => el !== action.payload);
        if (!state.cityTypes.length) {
          state.cityTypes = initialState.cityTypes;
        }
      }
    },
    sortFilter: (state, action) => {
      state.sortType = action.payload;
    },
    recruitFilter: (state) => {
      state.recruit = !state.recruit;
    },
    refreshPosts: (state) => {
      state.filterData = state.originalData.filter(
        (item) =>
          item.sportsTypes.some((el) => state.sportsTypes.includes(el)) &&
          state.cityTypes.includes(item.city),
      );
      if (state.recruit) {
        state.filterData = state.filterData.filter((item) => item.recruit);
      }
      if (state.sortType === 'popularity') {
        state.filterData = state.filterData.sort(
          (a, b) => b.likeCount - a.likeCount,
        );
      }
    },
  },
  extraReducers: {
    [fetchUserByPosts.pending]: (state) => {
      state.loading = true;
      state.error = false;
      state.originalData = null;
      state.filterData = null;
    },
    [fetchUserByPosts.fulfilled]: (state, action) => {
      state.originalData = action.payload;
      state.filterData = action.payload;
      state.loading = false;
      state.error = false;
    },
    [fetchUserByPosts.rejected]: (state) => {
      state.originalData = null;
      state.filterData = null;
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  sportsFilter,
  cityFilter,
  sortFilter,
  recruitFilter,
  refreshPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
