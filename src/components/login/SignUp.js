import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import client from '../../service/axios';
import { toast } from 'react-toastify';

function SignUp({ setLoginPage }) {
  const [loginData, setloginData] = useState({
    id: '',
    nickName: '',
    pw: '',
    pwConfirm: '',
  });

  const { id, pw, pwConfirm, nickName } = loginData;

  const onChange = (e) => {
    const { value, name } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };

  const signUpOnClcik = async () => {
    try {
      const response = await client.post('/signup', {
        id: id,
        pw: pw,
        nickname: nickName,
      });
      if (response.data === 0) {
        toast.error('아이디가 중복되었습니다', { autoClose: 1500 });
      } else if (response.data === 1) {
        toast.error('닉네임이 중복되었습니다', { autoClose: 1500 });
      } else {
        toast.success('회원가입에 성공하였습니다.', { autoClose: 1500 });
        setLoginPage('login');
      }
    } catch {
      alert('잠시 후 다시 시도해주세요!');
    }
  };

  return (
    <StyledModalWrap>
      <div className="login-body">
        <p>아이디</p>
        <div className="check">
          <input
            name="id"
            onChange={onChange}
            value={id}
            type="name"
            placeholder="아이디"
            autoComplete="new-password"
          />
        </div>

        <p className="cancel">닉네임</p>
        <input
          name="nickName"
          onChange={onChange}
          value={nickName}
          type="text"
          placeholder="비밀번호"
          autoComplete="new-password"
        />
        <p className="cancel">비밀번호</p>
        <input
          name="pw"
          onChange={onChange}
          value={pw}
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
        />
        <p className="cancel">비밀번호 확인</p>
        <input
          name="pwConfirm"
          onChange={onChange}
          value={pwConfirm}
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
        />
        {pw && pwConfirm && pw !== pwConfirm && (
          <p className="fail-login">비밀번호를 확인해 주세요.</p>
        )}
        <div className="button-wrap">
          <button
            type="button"
            className="login-btn"
            onClick={signUpOnClcik}
            disabled={!(id && nickName && pw && pwConfirm && pw === pwConfirm)}
          >
            회원가입 하기
          </button>
          <button
            onClick={() => setLoginPage('login')}
            type="button"
            className="signup-btn"
          >
            로그인 하러 가기
          </button>
        </div>
      </div>
    </StyledModalWrap>
  );
}

SignUp.propTypes = {
  setLoginPage: propTypes.func.isRequired,
};
export default SignUp;

const StyledModalWrap = styled.div`
  .login-body {
    padding: 0 1rem;
    input {
      width: 100%;
      padding: 1rem;
      border: 1px solid #000;
    }
    input + input {
      margin-top: 20px;
    }
    .check {
      display: flex;
    }
    p {
      font-weight: bold;
      margin: 15px 0;
    }
    .fail-login {
      font-size: 0.7rem;
      color: red;
    }
    .button-wrap {
      margin-top: 30px;
      button {
        width: 100%;
        padding: 10px 0;
      }
      .login-btn {
        background-color: #272e33;
        color: #fff;
        &:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
      }
      .signup-btn {
        background-color: #000;
        color: #fff;
        margin-top: 20px;
      }
    }
  }
`;
