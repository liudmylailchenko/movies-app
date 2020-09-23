import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/macro';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Paper, Typography } from '@material-ui/core';
import { SelectFormik } from '../../components/formElements/SelectFormik';
import { TextFieldFormik } from '../../components/formElements/TextFieldFormik';
import { useSearch, useUpdateSearch } from '../../hooks/useSearch';
import { pushSearch } from '../searches/searchesSlice';

const StyledButton = styled(Button)`
  height: 55px;
`;

const FormContainer = styled(Paper)`
  display: grid;
  grid-gap: 16px;
  grid-template-rows: 1fr 2fr 2fr 2fr auto;
  align-items: flex-start;
  padding: 32px 16px;
  margin-bottom: 24px;
`;

const movieTypeOptions = [
  { label: 'Any', value: '' },
  { label: 'Movie', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episode', value: 'episode' },
];

const validationSchema = yup.object().shape({
  title: yup.string().required('Title field is required!'),
});

export const FilterForm = () => {
  const dispatch = useDispatch();
  const { title, type, year } = useSearch();
  const updateSearchParams = useUpdateSearch();

  const handleSubmit = useCallback(
    (params) => {
      const nextParams = { ...params, page: 1 };
      // Go to the first page every time search criteria changes
      updateSearchParams(nextParams);
      // Push new search to the searches history
      dispatch(pushSearch(nextParams));
    },
    [updateSearchParams, dispatch],
  );

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        title,
        type,
        year,
      }}
    >
      <Form autoComplete="off">
        <FormContainer>
          <Typography variant="h6">Search:</Typography>
          <Field
            name="title"
            component={TextFieldFormik}
            variant="outlined"
            label="Title"
            helperText="Enter a title for the movie"
          />
          <Field
            name="type"
            component={SelectFormik}
            label="Type"
            variant="outlined"
            options={movieTypeOptions}
            helperText="Select the type of film to search"
          />
          <Field
            name="year"
            component={TextFieldFormik}
            variant="outlined"
            label="Year"
            helperText="Enter release date"
            type="number"
          />
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            <SearchIcon />
          </StyledButton>
        </FormContainer>
      </Form>
    </Formik>
  );
};
