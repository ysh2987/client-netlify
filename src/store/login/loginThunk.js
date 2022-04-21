import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../service/axios';

export const fetchByLogin = createAsyncThunk(
  'users/fetchByLogin',
  async (userData) => {
    const response = await client.post('/users', {
      id: userData.id,
      pw: userData.pw,
    });
    return response.data;
  },
);

export const fetchByResign = createAsyncThunk(
  'users/fetchByResign',
  async (userData) => {
    const response = await client.delete(`/users/${userData}`);
    return response.data;
  },
);

export const fetchByNickName = createAsyncThunk(
  'users/fetchByNickName',
  async (userData) => {
    const response = await client.patch(`/users/${userData.userId}`, {
      nickName: userData.userNickName,
    });
    return response.data;
  },
);
