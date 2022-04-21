import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailByPosts } from '../../store/detail/detailThunk';
import dataTypes from '../../dataTypes';

function Detail() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(fetchDetailByPosts(no));
  }, []);

  return (
    <StyledDetail>
      {postData && (
        <>
          <h1 className="title">{postData.title}</h1>
          <div className="detail-header">
            <span className="detail-nickname">{postData.owner.nickname}</span>
            <span className="detail-date">{postData.date}</span>
          </div>
          <div className="detail-sports">
            <span>지역 </span>
            <ul>
              <li>{dataTypes.cities[postData.city]}</li>
            </ul>
          </div>
          <div className="detail-sports">
            <span>종목 </span>
            <ul>
              {postData.sportsTypes.map((item) => {
                return <li key={item}>{dataTypes.sports[item]}</li>;
              })}
            </ul>
          </div>

          <div className="detail-content">
            <p>{postData.content}</p>
          </div>
          <Comment no={no} />
        </>
      )}
    </StyledDetail>
  );
  // }
}

export default Detail;

const StyledDetail = styled.main`
  padding: 3rem 1.5rem;
  max-width: 768px;
  margin: 0 auto;
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    font-size: 1.2rem;
    .detail-date {
      color: #bbb;
    }
    .detail-nickname {
      font-weight: bold;
    }
  }
  .detail-sports {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dcdcdc;
    margin-top: 40px;
    padding: 15px 0;
    span {
      font-size: 1.2rem;
      align-items: center;
      margin-right: 20px;
      font-weight: bold;
    }
    ul {
      display: flex;
    }
    li {
      margin-right: 0.5rem;
      background: #dce2f0;
      border: 2px solid #dce2f0;
      border-radius: 58px;
      padding: 0.3rem 0.75rem;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
  .detail-content {
    white-space: pre-wrap;
    margin-top: 60px;
    p {
      font-size: 1.125rem;
      word-break: break-all;
      line-height: 1.7;
      letter-spacing: -0.004em;
    }
  }
`;
