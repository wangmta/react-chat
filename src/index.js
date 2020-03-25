import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Request from './utils/request';
import './index.scss';
import App from './router';

ReactDom.render(<App />, document.getElementById('App'));

Request.axiosConfigInit();
