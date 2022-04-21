import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByLogin } from '../../store/login/loginThunk';

function Login({ setLoginPage }) {
  const dispatch = useDispatch();
  const { loginRejected } = useSelector((state) => state.login);

  const [loginData, setloginData] = useState({
    id: '',
    pw: '',
  });

  const { id, pw } = loginData;

  const onChange = (e) => {
    const { value, name } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginClick = () => {
    dispatch(fetchByLogin({ id: id, pw: pw }));
  };

  const loginEnter = (e) => {
    if (e.key === 'Enter' && id && pw) {
      loginClick();
    }
  };

  useEffect(() => {
    setloginData({ ...loginData, pw: '' });
  }, [loginRejected]);

  return (
    <StyledModalWrap>
      <div className="login-body">
        <p>아이디</p>
        <input
          name="id"
          onChange={onChange}
          onKeyUp={loginEnter}
          value={id}
          type="name"
          placeholder="아이디"
          autoComplete="off"
        />
        <p className="cancel">비밀번호</p>
        <input
          name="pw"
          onChange={onChange}
          onKeyUp={loginEnter}
          value={pw}
          type="password"
          placeholder="비밀번호"
          autoComplete="off"
        />

        {loginRejected && (
          <p className="fail-login">아이디 / 비밀번호를 확인해주세요.</p>
        )}
        <div className="button-wrap">
          <button
            type="button"
            className="login-btn"
            onClick={loginClick}
            disabled={!(id && pw)}
          >
            로그인
          </button>
          <button
            onClick={() => setLoginPage('signUp')}
            type="button"
            className="signup-btn"
          >
            회원가입
          </button>
        </div>
      </div>
    </StyledModalWrap>
  );
}

Login.propTypes = {
  setLoginPage: propTypes.func,
};
export default Login;

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
