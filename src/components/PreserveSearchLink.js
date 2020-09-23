import React, { forwardRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

export const PreserveSearchLink = forwardRef(
  ({ children, to, ...otherProps }, ref) => {
    const { location } = useHistory();

    return (
      <Link
        ref={ref}
        to={{ pathname: to, search: location.search }}
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);
