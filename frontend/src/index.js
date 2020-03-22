import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { ThemeProvider } from './Material-UI/import';
import theme from './Material-UI/theme';
import App from './Containers/App/App';
import { AppProvider } from './store/context';

import './global-styles/index.css';

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
