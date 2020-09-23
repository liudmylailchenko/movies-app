import React from 'react';
import { useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Container, Backdrop, CircularProgress } from '@material-ui/core';
import { history } from './utils/history';
import { MoviesListPage } from './features/movies/MoviesListPage';
import { MovieDetailsPage } from './features/movies/MovieDetailsPage';
import { FilterForm } from './features/movies/FilterForm';

const StyledContainer = styled(Container)`
  margin-top: 48px;
  margin-bottom: 48px;
`;
const StyledBackdrop = styled(Backdrop)`
  z-index: 1000;
  color: '#fff';
`;

function App() {
  const { loading } = useSelector((state) => state.movies);
  return (
    <StyledContainer maxWidth="lg">
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <FilterForm />
      <Router history={history}>
        <Switch>
          <Route path="/" component={MoviesListPage} exact />
          <Route path="/:id" component={MovieDetailsPage} exact />
        </Switch>
      </Router>
    </StyledContainer>
  );
}

export default App;
