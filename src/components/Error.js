import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';

const StyledError = styled(Typography)`
  text-align: center;
`;

export const Error = ({ children }) => {
  return <StyledError variant="h5">{children}</StyledError>;
};
