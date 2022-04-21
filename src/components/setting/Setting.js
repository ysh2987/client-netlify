import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ImBook } from 'react-icons/im';
import Card from '../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByResign, fetchByNickName } from '../../store/login/loginThunk';
import { useNavigate } from 'react-router-dom';
import client from '../../service/axios';

function Setting() {
  const [input, setInput] = useState('');
  const [ownerData, setOwnerData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, userNickName } = useSelector((state) => state.login);

  const getPostsOwner = async () => {
    const resposne = await client.get(`/posts/setting/${userId}`);
    setOwnerData(resposne.data);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const userOut = () => {
    if (confirm('정말로 탈퇴 하시겠습니까?')) {
      dispatch(fetchByResign(userId));
      navigate('/');
    }
  };

  const changeNickName = () => {
    dispatch(fetchByNickName({ userId, userNickName: input })).then(
      (response) => {
        if (response.payload.status === '1') navigate('/');
      },
    );
  };

  useEffect(() => {
    setInput(userNickName);
    getPostsOwner();
  }, []);

  return (
    <StyledSetting>
      <p className="title">내 정보 수정</p>
      <div className="nickname-modify">
        <p className="nickName">닉네임</p>
        <input type="text" value={input} onChange={onChange} />
      </div>
      <p className="content">Team-Finder에서 사용되는 이름입니다.</p>
      <hr />

      <p className="write">
        <ImBook />
        <span>작성 목록</span>
      </p>
      {ownerData.length ? (
        <Card dataList={ownerData} />
      ) : (
        <div className="not-write">
          <p>내가 작성한 글이 없습니다.</p>
        </div>
      )}

      <p className="content">Team-Finder에서 내가 작성한 게시글 입니다.</p>
      <hr />
      <div className="btn-wrap">
        <button type="button" onClick={changeNickName}>
          완료
        </button>
        <button type="button" onClick={userOut}>
          회원 탈퇴
        </button>
      </div>
    </StyledSetting>
  );
}

export default Setting;

const StyledSetting = styled.main`
  padding: 0 1.5rem;
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  .nickname-modify {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    .nickName {
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 15rem;
    }
    input {
      margin-top: 5px;
      border: 1px solid #bbb;
      padding: 10px;
      border-radius: 5px;
    }
  }
  .content {
    font-size: 1rem;
    color: #bbb;
    margin-bottom: 5px;
  }
  .write {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
    span {
      margin-left: 5px;
    }
  }
  .btn-wrap {
    margin-top: 15px;
    button {
      background-color: #262626;
      color: #fff;
      font-weight: 700;

      border-radius: 5px;
      width: 100px;
      padding: 10px;
      margin-right: 10px;
      font-size: 1rem;
      cursor: pointer;
      &:last-child {
        background-color: #ff3217;
      }
    }
  }
  .not-write {
    height: 200px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 2rem;
    font-weight: bold;
  }
`;
