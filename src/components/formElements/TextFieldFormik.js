import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * Formik wrapper over MUI TextField
 */
export const TextFieldFormik = ({ field, form, helperText, ...otherProps }) => {
  return (
    <TextField
      error={!!form.touched[field.name] && !!form.errors[field.name]}
      helperText={
        form.touched[field.name] && form.errors[field.name]
          ? form.errors[field.name]
          : helperText
      }
      {...field}
      {...otherProps}
      fullWidth
    />
  );
};
