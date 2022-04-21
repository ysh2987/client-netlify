import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isModal } from '../../store/login/loginSlice';
import { toast } from 'react-toastify';
import { fetchDetailCommentByPosts } from '../../store/detail/detailThunk';

function Comment({ no }) {
  const today = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .split('T')[0];

  const [content, setContent] = useState('');

  const { postData } = useSelector((state) => state.detail);

  const { isLogin, userId, userNickName } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const commentsSubmit = () => {
    if (!isLogin) {
      dispatch(isModal(true));
      return;
    }
    if (!content.trim()) {
      toast.error('댓글을 입력해 주세요!', { autoClose: 1500 });
      return;
    }

    dispatch(
      fetchDetailCommentByPosts({
        no,
        content,
        date: today,
        owner: { id: userId, nickname: userNickName },
      }),
    ).then(() => toast.success('댓글이 등록 되었습니다.', { autoClose: 1500 }));
  };

  return (
    <StyledComment>
      <p className="comment-title">
        {postData.comments.length}개의 댓글이 있습니다.
      </p>
      <textarea
        type="text"
        name="content"
        value={content}
        onChange={onChange}
        rows="15"
        className="content"
        placeholder="댓글을 입력해 주세요!"
      />
      <div className="submit">
        <button type="button" onClick={commentsSubmit}>
          댓글 등록
        </button>
      </div>
      <ul>
        {postData.comments.map((item) => {
          return (
            <li key={item.id}>
              <p className="user">{item.owner.nickname}</p>
              <p className="date">{item.date}</p>
              <p className="content">{item.content}</p>
            </li>
          );
        })}
      </ul>
    </StyledComment>
  );
}

Comment.propTypes = {
  no: PropTypes.string.isRequired,
};

export default Comment;

const StyledComment = styled.section`
  margin-top: 60px;
  .comment-title {
    font-size: 1.5em;
    font-weight: bold;
  }
  .submit {
    display: flex;
    justify-content: flex-end;
    button {
      font-weight: 700;
      color: #fff;
      border-radius: 4px;
      width: 6rem;
      height: 2rem;
      font-size: 1rem;
      background-color: #262626;
    }
  }
  textarea {
    padding: 1rem 1rem 1.5rem;
    outline: none;
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    border: 1px solid;
    border-radius: 5px;
    margin-top: 30px;
  }
  li {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #dcdcdc;
    p {
      line-height: 30px;
    }
    .user {
      font-weight: bold;
    }
    .date {
      font-weight: bold;
    }
    .content {
      font-size: 1.2rem;
    }
  }
`;
