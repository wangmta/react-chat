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
    this.handleChange = this.handleChange.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  // The get syntax binds an object property to a function that will be called when that property is looked up.
  // get latest(){}
  // obj.latest
  get clientId() {
    return '8c694af835d62f8fd490';
  }

  async gitHubLogin() {
    const href = window.location.href;
    console.log(window.location);
    if (/\/login\?code/.test(href)) {
      const code = href.split('?code=')[1];
      Request.axiosRequest('post', '/api/v1/github_oauth', {
        code,
        clientId: this.clientId
      })
        .then(response => {
          localStorage.setItem('userInfo', JSON.stringify(response));
          window.location.reload();
          const originalLink = sessionStorage.getItem('originalLink');
          if (originalLink) {
            sessionStorage.removeItem('originalLink');
            window.location.href = originalLink;
            return;
          }
          window.location.href = '/';
        })
        .catch(error => {
          console.log(
            'make sure your github has a public email, otherwise it might throw an error',
            error
          );
          window.open(
            'https://user-images.githubusercontent.com/24861316/75133098-6b564600-5714-11ea-824a-b367ed55b1a1.png'
          );
          window.location.href = '/login';
        });
    }
  }

  handleChange(event) {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  }

  handleCLick() {
    this.props.setValue(this.state);
  }

  componentDidMount() {
    this.gitHubLogin().then(() => {
      this.setState({ showSpinner: false });
    });
  }

  render() {
    const { isLogin } = this.props;
    const { name, password } = this.state;
    const loginClass = isLogin ? 'active' : 'inactive';
    const registerClass = isLogin ? 'inactive' : 'active';
    const linkUrl = isLogin ? '/signup' : '/login';
    const buttonName = isLogin ? 'Login' : 'Sign Up';
    const OAuthHref = `https://github.com/login/oauth/authorize?client_id=${this.clientId}`;
    return (
      <div className="form-content fadeInDown">
        {this.state.showSpinner && <Spinner />}
        <div className="chat-Logo">
          <img src="https://cdn.aermin.top/ghChatIcon.png" alt="ChatLogo" />
        </div>
        <Link to={linkUrl}>
          <span className={loginClass}>Login</span>
        </Link>
        <Link to={linkUrl}>
          <span className={registerClass}>Sign Up</span>
        </Link>
        <div className="user-avatar-wrapper">
          <UserAvatar name={name || '?'} size="100" />
        </div>
        <div className="center">
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="username"
          />
        </div>
        <div className="center">
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="password"
          />
        </div>
        <div className="center">
          <input type="button" onClick={this.handleCLick} value={buttonName} />
        </div>
        <div className="center">
          <p className="auth-tips">GitHub login is reccommended</p>
          <a className="github-oauth" href={OAuthHref}>
            <svg className="icon githubIcon" aria-hidden="true">
              <use xlinkHref="#icon-github" />
            </svg>
          </a>
        </div>
        <div className="version">Version: 2.5.5</div>
      </div>
    );
  }
}

SignInSignUp.propTypes = {
  setValue: PropTypes.func,
  isLogin: PropTypes.bool
};

SignInSignUp.defaultProps = {
  setValue() {},
  isLogin: false
};
