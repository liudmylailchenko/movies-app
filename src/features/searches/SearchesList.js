import React from 'react';
import qs from 'querystring';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Paper, ListItem, Typography } from '@material-ui/core';

const Wrapper = styled(Paper)`
  display: grid;
  grid-gap: 16px;
  padding: 16px;
`;

const formatSearchLabel = ({ ...params }) => {
  delete params.page;

  return Object.entries(params)
    .filter(([, val]) => !!val)
    .map(([key, val]) => `${key}: ${val}`)
    .join(' | ');
};

const formatSearchLUrl = (params) => {
  return '/?' + qs.stringify(params);
};

export const SearchesList = () => {
  const { searches } = useSelector((state) => state);

  return (
    <Wrapper>
      <Typography variant="h6">Search history:</Typography>
      {searches.map(({ id, ...searchParams }) => (
        <ListItem
          button
          component={Link}
          to={formatSearchLUrl(searchParams)}
          key={id}
        >
          {formatSearchLabel(searchParams)}
        </ListItem>
      ))}
    </Wrapper>
  );
};
