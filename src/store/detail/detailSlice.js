import { createSlice } from '@reduxjs/toolkit';
import { fetchDetailByPosts, fetchDetailCommentByPosts } from './detailThunk';

const initialState = {
  postData: null,
  idData: false,
  isLoading: false,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDetailByPosts.pending]: (state) => {
      state.postData = null;
      state.isLoading = true;
      state.isData = false;
    },
    [fetchDetailByPosts.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.isLoading = false;
      state.isData = true;
    },
    [fetchDetailByPosts.rejected]: (state) => {
      state.postData = null;
      alert('잠시 후 다시 시도해주세요!');
    },

    [fetchDetailCommentByPosts.pending]: (state) => {
      state.postData = null;
      state.isLoading = true;
      state.isData = false;
    },
    [fetchDetailCommentByPosts.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.isLoading = false;
      state.isData = true;
    },
    [fetchDetailCommentByPosts.rejected]: (state) => {
      state.postData = null;
      alert('잠시 후 다시 시도해주세요!');
    },
  },
});

// export const {
//   sportsFilter,
//   cityFilter,
//   sortFilter,
//   recruitFilter,
//   refreshPosts,
// } = detailSlice.actions;

export default detailSlice.reducer;
