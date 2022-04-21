import { createSlice } from '@reduxjs/toolkit';
import { fetchDetailByPosts, fetchDetailCommentByPosts } from './detailThunk';

const initialState = {
  postData: null,
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
    },
    [fetchDetailByPosts.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.isLoading = false;
    },
    [fetchDetailByPosts.rejected]: (state) => {
      state.postData = null;
      alert('잠시 후 다시 시도해주세요!');
      state.isLoading = false;
    },
    [fetchDetailCommentByPosts.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.isLoading = false;
    },
    [fetchDetailCommentByPosts.rejected]: (state) => {
      state.postData = null;
      alert('잠시 후 다시 시도해주세요!');
    },
  },
});

export default detailSlice.reducer;
