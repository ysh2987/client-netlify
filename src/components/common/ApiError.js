import React from 'react';
import styled from 'styled-components';

function ApiError() {
  return (
    <StyledError>
      <p>500 ERROR</p>
      <p>잠시후 다시 시도해 주세요!</p>
    </StyledError>
  );
}

export default ApiError;

const StyledError = styled.div`
  text-align: center;
  p:first-child {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p:last-child {
    font-size: 1.2rem;
  }
`;
