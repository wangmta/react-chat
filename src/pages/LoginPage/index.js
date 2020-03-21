import React from 'react';
import notification from '../../components/Notification';

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
      notification('user name can only take alphanumeric value plus underscore.', 'warn');
      return;
    }
    if (!/[a-zA-Z0-9]+$/.test(password)) {
      notification('password name can only take alphanumeric value', 'warn');
      return;
    }
    try {
    } catch (error) {
      notification(error, 'error');
    }
  }

  setValue(value) {
    const { name, password } = value;
    this.setState({ name, password }, async () => {
      await this.login();
    });
  }

  confirm() {
    this.setState({
      modal: { visible: true },
    });
    window.location.reload();
  }
}

export default LoginPage;
