import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../service/axios';

const fetchUserByPosts = createAsyncThunk(
  'posts/fetchByPostsData',
  async () => {
    const response = await client.get('/posts');
    return response.data;
  },
);

export default fetchUserByPosts;
