import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import fetchUserByPosts from '../../store/posts/postsThunk';
import Card from '../common/Card';
import Filter from './Filter';
import Loading from '../common/Loading';
import ApiError from '../common/ApiError';
import { isModal } from '../../store/login/loginSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { filterData, loading, error } = useSelector((state) => state.posts);
  const { isLogin } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserByPosts());
  }, []);

  const firstWriteClick = () => {
    if (!isLogin) {
      dispatch(isModal(true));
      return;
    }
    navigate('/write');
  };

  return (
    <StyledHome>
      <section className="banner">
        <p className="title">
          원하는 지역과 스포츠를
          <br />
          함께할 팀원을 찾는 방법
        </p>
        <p>
          <span>Team Finder</span>에서 함께 할 팀원을 찾아보세요!
        </p>
        <img src="/images/team.png" alt="we are the team" />
      </section>
      <Filter />
      <section className="card-wrap">
        {loading && <Loading />}
        {error && <ApiError />}
        {filterData && !!filterData.length && (
          <Card dataList={filterData} type="home" />
        )}
        {filterData && !filterData.length && (
          <div className="not-data">
            <p>작성된 게시글이 없습니다.</p>
            <button type="button" onClick={firstWriteClick}>
              첫 번째로 작성하러 가기
            </button>
          </div>
        )}
      </section>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.main`
  .banner {
    text-align: center;
    margin-bottom: 50px;
    p {
      font-size: 1.5rem;
    }
    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }
    span {
      font-family: 'Anton', sans-serif;
      font-size: 1.8rem;
    }
    img {
      width: 100%;
      max-width: 800px;
    }
  }
  .card-wrap {
    padding: 40px 0;
    background-color: #e0e0e0;
    .not-data {
      text-align: center;
      padding: 20px 0;
      p {
        font-size: 1.2rem;
        font-weight: bold;

        margin-bottom: 25px;
      }
      button {
        padding: 15px;
        border: 1px solid;
        border-radius: 5px;
        &:hover {
          background-color: black;
          color: #fff;
        }
      }
    }
  }
`;
