import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/common/Header';
import Home from './components/home/Home';
import Setting from './components/setting/Setting';
import Write from './components/write/Write';
import Detail from './components/detail/Detail';
import LoginContainer from './components/login/LoginContainer';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/:no" element={<Detail />} />
      </Routes>
      <LoginContainer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
