import React from 'react';
import dataTypes from '../../dataTypes';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  sportsFilter,
  cityFilter,
  sortFilter,
  recruitFilter,
  refreshPosts,
} from '../../store/posts/postsSlice';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';

function Filter() {
  const { cities, sports } = dataTypes;

  const { cityTypes } = useSelector((state) => state.posts);
  const { sportsTypes } = useSelector((state) => state.posts);
  const { sortType } = useSelector((state) => state.posts);
  const { recruit } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const sportsOnClick = (index) => {
    dispatch(sportsFilter(index));
    dispatch(refreshPosts());
  };

  const cityOnClick = (index) => {
    dispatch(cityFilter(index));
    dispatch(refreshPosts());
  };

  const sortOnClick = (type) => {
    dispatch(sortFilter(type));
    dispatch(refreshPosts());
  };

  const recruitOnClick = () => {
    dispatch(recruitFilter());
    dispatch(refreshPosts());
  };

  return (
    <section>
      <StyledCityFilter>
        <ul className="city-filter">
          {cities.map((city, index) => {
            return (
              <li
                key={city}
                className={!cityTypes.includes(index) ? 'active' : undefined}
                onClick={() => cityOnClick(index)}
              >
                {city}
              </li>
            );
          })}
        </ul>
      </StyledCityFilter>
      <StyledSportsFilter>
        <ul className="sports-filter">
          {sports.map((sport, index) => {
            return (
              <li
                key={sport}
                className={!sportsTypes.includes(index) ? 'active' : undefined}
                onClick={() => sportsOnClick(index)}
              >
                <img src={`/images/sports/${sport}.png`} alt={sport} />
                <p>{sport}</p>
              </li>
            );
          })}
        </ul>
      </StyledSportsFilter>
      <StyledRecentlyFilter>
        <div className="all-wrap">
          <div className="left-wrap">
            <div
              className={sortType === 'recently' ? 'active' : undefined}
              onClick={() => sortOnClick('recently')}
            >
              <BsFillCalendarCheckFill size="1.5rem" />
              <span>최신</span>
            </div>
            <div
              className={sortType === 'popularity' ? 'active' : undefined}
              onClick={() => sortOnClick('popularity')}
            >
              <AiFillStar size="1.5rem" />
              <span>인기</span>
            </div>
          </div>
          <div className="right-wrap" onClick={recruitOnClick}>
            <input type="checkbox" checked={recruit} readOnly />
            <span>모집 중인 글만 보기</span>
          </div>
        </div>
      </StyledRecentlyFilter>
    </section>
  );
}

export default Filter;

const StyledCityFilter = styled.div`
  background-color: #e0e0e0;

  .city-filter {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      padding: 5px 10px;
      color: #fff;
      background-color: #000;
      cursor: pointer;
      border-radius: 15px;
      &:hover {
        transform: scale(1.2);
        transition: 0.5s;
      }
      &.active {
        background-color: #fff;
        color: #000;
      }
    }
  }
`;

const StyledSportsFilter = styled.div`
  box-shadow: 0 0 15px rgb(0 0 0 / 15%);
  ul {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem 8rem;
    padding: 15px 10px;
  }
  li {
    text-align: center;

    &.active {
      opacity: 0.4;
    }

    p {
      margin-top: 5px;
    }
  }
  img {
    width: 70px;
    height: 70px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      transition: 0.5s;
    }
  }
`;

const StyledRecentlyFilter = styled.div`
  background-color: #e0e0e0;
  .all-wrap {
    display: flex;
    justify-content: space-between;
    padding: 20px 1rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  .left-wrap {
    display: flex;
    align-items: center;
    div + div {
      margin-left: 1rem;
    }
    div {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0.5;
      &.active {
        opacity: 1;
      }
      &: hover {
        transform: scale(1.1);
        transition: 0.5s;
      }
      span {
        margin-left: 5px;
      }
    }
  }
  .right-wrap {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    input {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 5px;
    }
  }
`;
