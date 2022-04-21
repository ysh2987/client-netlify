import { createSlice } from '@reduxjs/toolkit';
import { fetchByLogin, fetchByResign, fetchByNickName } from './loginThunk';
import { toast } from 'react-toastify';

const initialState = {
  isLogin: false,
  userNickName: null,
  userId: null,
  modalOpen: false,
  loginRejected: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    logOut: () => initialState,
    loginInit: (state) => {
      state.loginRejected = false;
    },
  },
  extraReducers: {
    [fetchByLogin.pending]: (state) => {
      state.isLogin = false;
      state.userId = null;
      state.userNickName = null;
      state.loginRejected = false;
    },
    [fetchByLogin.fulfilled]: (state, action) => {
      if (action.payload.state) {
        state.isLogin = true;
        state.userId = action.payload.data.id;
        state.userNickName = action.payload.data.nickname;
        state.modalOpen = false;
        toast.success(`${state.userNickName}님 환영합니다.`, {
          autoClose: 1500,
        });
      } else {
        state.loginRejected = true;
      }
    },

    [fetchByLogin.rejected]: () => {
      alert('잠시 후 다시 시도해주세요!');
    },
    [fetchByResign.fulfilled]: (state) => {
      state.isLogin = false;
      state.userId = null;
      state.userNickName = null;
      state.loginRejected = false;
      toast.success('회원이 탈퇴되었습니다.', {
        autoClose: 1500,
      });
    },
    [fetchByResign.rejected]: () => {
      alert('잠시 후 다시 시도해주세요!');
    },
    [fetchByNickName.fulfilled]: (state, action) => {
      if (+action.payload.status === 0) {
        state.nickNameCheck = 0;
        toast.error('닉네임이 중복됩니다.', {
          autoClose: 1500,
        });
      } else if (+action.payload.status === 1) {
        state.userNickName = action.payload.nickName;
        toast.success('닉네임이 수정되었습니다.', {
          autoClose: 1500,
        });
      }
    },
    [fetchByNickName.rejected]: () => {
      alert('잠시 후 다시 시도해주세요!');
    },
  },
});

export const { isModal, logOut, loginInit } = loginSlice.actions;

export default loginSlice.reducer;
