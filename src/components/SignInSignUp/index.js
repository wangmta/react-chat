import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Spinner from '../Spinner';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router-dom';
import Request from '../../utils/request';

export default class SignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      showSpinner: true
    };
  }
}
