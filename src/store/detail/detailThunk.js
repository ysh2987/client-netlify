import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../service/axios';

export const fetchDetailByPosts = createAsyncThunk(
  'posts/fetchByDetailData',
  async (id) => {
    const response = await client.get(`/posts/${id}`);
    return response.data;
  },
);

export const fetchDetailCommentByPosts = createAsyncThunk(
  'posts/fetchByDetailCommentData',
  async (contentData) => {
    const { no, content, date, owner } = contentData;
    const response = await client.post(`/posts/${no}/comments`, {
      content,
      date,
      owner,
    });
    return response.data;
  },
);
