import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Request from './utils/request';
import './index.scss';
import App from './router';

console.log(process.env.NODE_ENV);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App')
);

Request.axiosConfigInit();
