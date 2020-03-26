import React from 'react';
import './style.scss';

export default class WelcomePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="welcome-wrapper">
        <p className="title">Welcome</p>
        <p className="content">Let's start chatting.</p>
      </div>
    );
  }
}
