import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Container, Backdrop, CircularProgress } from '@material-ui/core';
import { MoviesListPage } from './features/movies/MoviesListPage';
import { MovieDetailsPage } from './features/movies/MovieDetailsPage';
import { FilterForm } from './features/movies/FilterForm';
import { SearchesList } from './features/searches/SearchesList';

const StyledContainer = styled(Container)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const MarkupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 24px;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: 1000;
  color: '#fff';
`;

function App() {
  const { loading } = useSelector((state) => state.movies);
  return (
    <StyledContainer maxWidth={false}>
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <MarkupContainer>
        <div>
          <FilterForm />
          <SearchesList />
        </div>

        <Switch>
          <Route path="/" component={MoviesListPage} exact />
          <Route path="/:id" component={MovieDetailsPage} exact />
        </Switch>
      </MarkupContainer>
    </StyledContainer>
  );
}

export default App;
