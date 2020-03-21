import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      modal: {
        visible: false,
      },
    };
  }

  async login() {
    const { name, password } = this.state;
    if (!/[a-zA-Z0-9_]+$/.test(name)) {
    }
  }
}
