import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import dataTypes from '../../dataTypes';
import { GrFormClose } from 'react-icons/gr';
import { toast } from 'react-toastify';
import client from '../../service/axios';
import { useSelector } from 'react-redux';

function Write() {
  const today = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .split('T')[0];

  const navigate = useNavigate();
  const { userId, userNickName } = useSelector((state) => state.login);

  const [input, setInput] = useState({
    title: '',
    content: '',
  });
  const [isShow, setIsShow] = useState(false);
  const [city, setCity] = useState('0');
  const [sportsArr, setSports] = useState([]);

  const { title, content } = input;
  const { cities, sports } = dataTypes;

  const citySelect = (e) => {
    setCity(e.target.value);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const deleteSports = (item) => {
    setSports(sportsArr.filter((el) => el !== item));
  };

  const showBtnClick = () => {
    setIsShow(!isShow);
  };

  const sportsClick = (item) => {
    setIsShow(false);
    if (sportsArr.includes(item)) {
      return;
    }
    setSports([...sportsArr, item]);
  };

  const createPosts = async () => {
    try {
      const reponse = await client.post('/posts', {
        title: title,
        content: content,
        sportsTypes: sportsArr,
        city: +city,
        owner: { id: userId, nickname: userNickName },
        date: today,
      });
      if (reponse.status === 200) {
        toast.success('글 작성이 완료되었습니다', {
          autoClose: 1500,
        });
        navigate('/');
      }
    } catch (e) {
      alert('잠시후 다시 시도해주세요');
    }
  };

  const postSubmit = () => {
    if (!title.trim())
      toast.error('제목을 입력해 주세요!', {
        autoClose: 1500,
      });
    else if (!sportsArr.length)
      toast.error('종목을 선택해 주세요!', {
        autoClose: 1500,
      });
    else if (!content.trim())
      toast.error('본문을 입력해 주세요!', {
        autoClose: 1500,
      });
    else {
      createPosts();
    }
  };

  return (
    <StyledWrite>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        className="title"
        placeholder="제목을 입력해 주세요"
      />
      <div className="city">
        <label>지역 :</label>
        <div className="city-wrap">
          <select onChange={citySelect} value={city}>
            {cities.map((item, index) => {
              return (
                <option value={index} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="sports">
        <label>종목 :</label>
        <div className="sports-area">
          <ul className="selectd-sports">
            {sportsArr.map((item) => {
              return (
                <li key={item}>
                  <span>{sports[item]}</span>
                  <GrFormClose onClick={() => deleteSports(item)} />
                </li>
              );
            })}
          </ul>
          <ul className={`select-sports ${isShow && 'show'}`}>
            {sports.map((item, index) => {
              return (
                <li key={item} onClick={() => sportsClick(index)}>
                  {item}
                </li>
              );
            })}
          </ul>
          <div className="list-btn">
            <img
              src="/images/select_icon.png"
              alt="listShow"
              onClick={showBtnClick}
            />
          </div>
        </div>
      </div>
      <textarea
        type="text"
        name="content"
        value={content}
        onChange={onChange}
        rows="15"
        className="content"
        placeholder="지역/종목 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성 부탁드려요!"
      />
      <div className="bottom-btn-wrap">
        <button
          type="button"
          className="posts-cancel"
          onClick={() => navigate('/')}
        >
          취소
        </button>
        <button type="button" className="posts-confirm" onClick={postSubmit}>
          글 등록
        </button>
      </div>
    </StyledWrite>
  );
}

export default Write;

const StyledWrite = styled.main`
  padding: 0 5rem;

  .title {
    width: 100%;
    padding: 5px 10px;
    font-size: 2rem;
    border-bottom: 1px solid #bbb;
    margin: 20px 0;
  }
  .content {
    width: 100%;
    font-size: 1.5rem;
    padding: 15px 20px;
    border: 1px solid #bbb;
    border-radius: 5px;
    resize: none;
  }
  .city {
    display: flex;
    align-items: center;

    label {
      min-width: 4rem;
      font-size: 1.5rem;
      margin-right: 20px;
    }
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      max-width: 500px;
      border: 1px solid #999;
      outline: none;
      padding: 0.8rem;
      border-radius: 5px;
      cursor: pointer;
      background: url('/images/select_icon.png') no-repeat right 9px center;
    }
    .city-wrap {
      max-width: 500px;
      width: 100%;
      position: relative;
    }
  }
  .sports {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .sports-area {
      width: 100%;
      position: relative;
      max-width: 500px;
      border: 1px solid #999;
      outline: none;

      border-radius: 5px;
    }
    .list-btn {
      position: absolute;
      right: 3px;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      img {
        right: 6px;
        position: relative;
        cursor: pointer;
      }
      svg {
        cursor: pointer;
      }
    }
    label {
      min-width: 4rem;
      font-size: 1.5rem;
      margin-right: 20px;
    }
    .select-sports {
      position: absolute;
      background-color: #fff;
      border: 1px solid #bbb;
      border-radius: 5px;
      width: 100%;
      margin-top: 9px;
      display: none;

      li {
        padding: 10px;
        border-bottom: 1px solid #bbb;
        cursor: pointer;
        &:hover {
          background-color: #bbb;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .selectd-sports {
      padding: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      min-height: 3rem;
      li {
        background-color: #bbb;
        padding: 5px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        span {
          margin-right: 5px;
        }
        svg {
          cursor: pointer;
          &:hover {
            background-color: rgb(255, 189, 173);
            color: rgb(222, 53, 11);
          }
        }
      }
    }
    .show {
      display: block;
    }
  }
  .bottom-btn-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 1rem;
      &.posts-confirm {
        font-weight: 700;
        background-color: #262626;
        color: #fff;
      }
      &.posts-cancel {
        background: #e9ecef;
        color: #495057;
        margin-right: 1rem;
      }
    }
  }
`;
