import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './posts/postsSlice';
import loginSlice from './login/loginSlice';
import detailSlice from './detail/detailSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    login: loginSlice,
    detail: detailSlice,
  },
});
