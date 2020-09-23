import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components/macro';
import * as yup from 'yup';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Paper } from '@material-ui/core';
import { SelectFormik } from '../../components/formElements/SelectFormik';
import { TextFieldFormik } from '../../components/formElements/TextFieldFormik';
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesList } from './moviesSlice';

const StyledButton = styled(Button)`
  height: 55px;
`;

const FormContainer = styled(Paper)`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr auto;
  align-items: flex-start;
  padding: 32px 16px;
  margin: 24px 0;
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
  const { title, type, year } = useSelector(
    (state) => state.movies.searchParams,
  );

  const handleSubmit = useCallback(
    (params) => {
      // Go to the first page every time search criteria changes
      dispatch(getMoviesList({ ...params, page: 1 }));
    },
    [dispatch],
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
            InputLabelProps={{
              shrink: true,
            }}
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
