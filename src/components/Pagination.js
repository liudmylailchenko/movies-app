import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { Typography, Button } from '@material-ui/core';

const Wrapper = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleTypography = styled(Typography)`
  min-width: 160px;
  text-align: center;
`;

export const Pagination = ({ page, totalPages, onChange }) => {
  const handleNext = useCallback(() => onChange(page + 1), [onChange, page]);
  const handlePrev = useCallback(() => onChange(page - 1), [onChange, page]);

  return (
    <Wrapper>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        disabled={page === 1}
        onClick={handlePrev}
      >
        <ArrowBack />
      </Button>
      <StyleTypography variant="h5" color="primary">
        {page} / {totalPages}
      </StyleTypography>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        disabled={page === totalPages}
        onClick={handleNext}
      >
        <ArrowForward />
      </Button>
    </Wrapper>
  );
};
