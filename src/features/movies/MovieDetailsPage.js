import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Paper, Typography, Button } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/KeyboardBackspace';
import { getMovie } from './moviesSlice';
import { Error } from '../../components/Error';
import { PreserveSearchLink } from '../../components/PreserveSearchLink';

const Wrapper = styled(Paper)`
  display: flex;
  padding: 24px 0;
  margin-bottom: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ImageContainer = styled.div`
  width: 35%;
  padding: 0 24px;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin: 0 24px;
  padding: 0 24px;
`;

export const MovieDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { single: movie, loading, error } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch, id]);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading || !movie) {
    return 'loading...';
  }

  return (
    <div>
      <Wrapper elevation={6}>
        <ImageContainer>
          <Image src={movie.Poster} />
        </ImageContainer>

        <InfoContainer>
          <Typography variant="h4" gutterBottom>
            {movie.Title}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Year:</strong> {movie.Year}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Runtime:</strong> {movie.Runtime}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Country:</strong> {movie.Country}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Genre:</strong> {movie.Genre}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Actors: </strong> {movie.Actors}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>IMDb: </strong> {movie.imdbRating}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {movie.Plot}
          </Typography>
        </InfoContainer>
      </Wrapper>
      <Button component={PreserveSearchLink} to="/" startIcon={<ArrowLeft />}>
        Back to home
      </Button>
    </div>
  );
};
