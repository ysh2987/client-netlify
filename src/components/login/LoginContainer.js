import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import SignUp from './SignUp';
import { isModal, loginInit } from '../../store/login/loginSlice';

function LoginContainer() {
  Modal.setAppElement('#root');
  const { modalOpen } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [loginPage, setLoginPage] = useState('login');

  const page = (pageStep) => {
    switch (pageStep) {
      case 'login':
        return <Login setLoginPage={setLoginPage} />;
      case 'signUp':
        return <SignUp setLoginPage={setLoginPage} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setLoginPage('login');
    dispatch(loginInit());
  }, [modalOpen]);

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      onRequestClose={() => dispatch(isModal(false))}
    >
      <StyledLoginHeader>
        <p className="logo">Team-Finder</p>
        <p onClick={() => dispatch(isModal(false))} className="cancel">
          X
        </p>
      </StyledLoginHeader>
      {page(loginPage)}
    </Modal>
  );
}

export default LoginContainer;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(77, 77, 77, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '450px',
    inset: 'unset',
    padding: '0 0 40px',
  },
};

const StyledLoginHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 10px 1rem;
  .cancel {
    font-weight: bold;
    cursor: pointer;
  }
  .logo {
    font-size: 1.2rem;
    font-family: 'Anton', sans-serif;
  }
`;
