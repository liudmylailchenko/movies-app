import React from 'react';
import {
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
} from '@material-ui/core';

/**
 * Formik wrapper over MUI Select
 */
export const SelectFormik = ({
  field,
  label,
  variant,
  options,
  helperText,
  ...otherProps
}) => {
  return (
    <FormControl variant={variant} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select autoWidth {...field} {...otherProps} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
