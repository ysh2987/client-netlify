import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dataTypes from '../../dataTypes';
import { useNavigate } from 'react-router-dom';

function Card({ dataList, type }) {
  const navigate = useNavigate();

  return (
    <StyledCardWrap className={type}>
      <StyledCard>
        {dataList.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`)}
              className={item.recruit ? undefined : 'recurit'}
            >
              <p className="title">{item.title}</p>
              <div className="sports-wrap">
                {item.sportsTypes.map((sport, index) => {
                  if (index > 2) return;
                  const sportPick = dataTypes.sports[sport];
                  return (
                    <div key={index}>
                      <img
                        src={`/images/sports/${sportPick}.png`}
                        alt={sportPick}
                      />
                      <p>{sportPick}</p>
                    </div>
                  );
                })}
              </div>
              <div className="card-footer">
                <span className="city-name">{dataTypes.cities[item.city]}</span>
                <span>♥ {item.likeCount}</span>
              </div>
              {!item.recruit && <div className="recruit-title">모집 완료</div>}
            </li>
          );
        })}
      </StyledCard>
    </StyledCardWrap>
  );
}

export default Card;

Card.propTypes = {
  dataList: PropTypes.array.isRequired,
  type: PropTypes.string,
};

const StyledCard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  li {
    width: 100%;
    max-width: 320px;
    position: relative;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.625rem;
    padding: 1.5rem;
    background: #fff;
    box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
    border-radius: 1.5rem;
    cursor: pointer;
    &.recurit {
      opacity: 0.5;
    }
    .title {
      font-size: 1.2rem;
      font-weight: 400;
      width: 100%;
      text-align: center;
      line-height: 1.265;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .sports-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      div + div {
        margin-left: 2rem;
      }
      p {
        margin-top: 10px;
      }
      img {
        width: 60px;
        height: 60px;
      }
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .city-name {
        border-radius: 5px;
        background-color: black;
        padding: 5px;
        color: #fff;
      }
    }
    .recruit-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      background-color: #000;
      padding: 10px;
    }
  }
`;

const StyledCardWrap = styled.div`
  &.home {
    width: 1370px;
    margin: 0 auto;

    @media screen and (max-width: 1370px) {
      width: 1030px;
    }
    @media screen and (max-width: 1030px) {
      width: 690px;
    }
    @media screen and (max-width: 690px) {
      width: 320px;
    }
  }
`;
