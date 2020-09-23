import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Paper } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { PreserveSearchLink } from '../../components/PreserveSearchLink';

const Wrapper = styled(Paper)`
  display: block;
  font-size: 20px;
  padding: 12px;
  height: 100%;
  text-decoration: none;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageContainer = styled.div`
  padding-top: 120%;
  position: relative;
`;
const ImageAligner = styled(Paper)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const MovieTitle = styled.p`
  text-align: center;
`;

export const MovieItem = ({ Title, Year, imdbID, Poster }) => {
  const [hovered, setHovered] = useState(false);

  const handleOnMouseOver = useCallback(() => {
    setHovered(true);
  }, []);

  const handleOnMouseOut = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <Wrapper
      elevation={hovered ? 6 : 1}
      component={PreserveSearchLink}
      // Save query params during navigation
      // so that we can preserve state after page refresh
      to={`/${imdbID}`}
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
    >
      <ImageContainer>
        <ImageAligner elevation={2} variant="outlined">
          {Poster === 'N/A' ? (
            <ImageIcon fontSize="large" />
          ) : (
            <Image src={Poster} alt="poster" />
          )}
        </ImageAligner>
      </ImageContainer>

      <MovieTitle>
        {Title} ({Year})
      </MovieTitle>
    </Wrapper>
  );
};
