import React from 'react';
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid';
import { MovieItem } from './MovieItem';

const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const MoviesList = ({ movies }) => {
  return (
    <Wrapper>
      <Grid container spacing={3}>
        {movies.map((movie) => {
          return (
            <Grid item xs={3} key={movie.imdbID}>
              <MovieItem key={movie.imdbID} {...movie} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};
