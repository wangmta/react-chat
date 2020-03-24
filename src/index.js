import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Request from './utils/request';
import './index.scss';

ReactDom.render(<Provider></Provider>, document.getElementById('App'));

Request.axiosConfigInit();
