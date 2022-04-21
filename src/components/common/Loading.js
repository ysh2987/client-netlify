import React from 'react';
import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

function Loading() {
  return (
    <StyledLoading>
      <RotatingLines />
    </StyledLoading>
  );
}

export default Loading;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
