import qs from 'querystring';
import { useHistory } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

/**
 * Parse location search and return memoized object
 */
export const useSearch = () => {
  const { location } = useHistory();

  // Use memo to preserve the params if search wasn't changed
  const params = useMemo(() => {
    // Destruct search params with default values
    const { title = '', type = '', year = '', page = 1 } = qs.parse(
      location.search.replace(/^\?/, ''),
    );

    // Return search params object
    return { title, type, year, page: parseInt(page, 10) || 1 };
  }, [location.search]);

  return params;
};

/**
 * Update location search by given params
 */
export const useUpdateSearch = () => {
  const history = useHistory();
  const search = useSearch();

  return useCallback(
    (nextSearch) => {
      history.push({
        pathname: history.location.pathname,
        search: '?' + qs.stringify({ ...search, ...nextSearch }),
      });
    },
    [history, search],
  );
};
