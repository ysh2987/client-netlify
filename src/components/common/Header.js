import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { isModal, logOut } from '../../store/login/loginSlice';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [list, setList] = useState(false);

  const dispatch = useDispatch();
  const { isLogin, userNickName } = useSelector((state) => state.login);

  const logoutClick = () => {
    dispatch(logOut());
    setList(false);
    toast.success('로그아웃 되었습니다.', { autoClose: 1500 });
    navigate('/');
  };

  const settingClick = () => {
    navigate('/setting');
    setList(false);
  };

  return (
    <StyledHeader>
      <Link to="/">
        <div className="logo">Team Finder</div>
      </Link>
      <div className="header-right">
        {isLogin ? (
          <>
            <button onClick={() => navigate('/write')}>새 글 쓰기</button>
            <button onClick={() => setList(!list)}>
              {userNickName} <MdOutlineArrowDropDown fill="#868e96" />
            </button>
            {list && (
              <ul>
                <li onClick={settingClick}>설정</li>
                <li onClick={logoutClick}>로그아웃</li>
              </ul>
            )}
          </>
        ) : (
          <>
            <button onClick={() => dispatch(isModal(true))}>새 글 쓰기</button>
            <button onClick={() => dispatch(isModal(true))}>로그인</button>
          </>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

  .logo {
    font-size: 2rem;
    font-family: 'Anton', sans-serif;
    letter-spacing: 0.3rem;

    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
  .header-right {
    position: relative;
    button {
      font-size: 1.2rem;
      font-weight: bold;
    }
    button + button {
      margin-left: 2rem;
    }
    ul {
      width: 15rem;
      position: absolute;
      background: #fff;
      box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
      margin-top: 20px;
      right: 0;
      li {
        padding: 0.75rem 1rem;
        line-height: 1.5;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
  }
`;
