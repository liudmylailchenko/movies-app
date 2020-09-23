import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { store } from './utils/store';
import App from './App';
import { history } from './utils/history';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[200],
    },
    secondary: {
      main: pink[200],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router history={history}>
            <App />
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
