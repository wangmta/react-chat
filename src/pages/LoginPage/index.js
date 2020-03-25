import React from 'react';
import notification from '../../components/Notification';
import Modal from '../../components/Modal';
import SignInSignUp from '../../components/SignInSignUp';
import Request from '../../utils/request';
import './style.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      modal: {
        visible: false
      }
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
      const res = await Request.axiosRequest('post', '/api/v1/login', { name, password });
      if (res && res.success) {
        this.setState({ modal: { visible: true } });
      } else {
        notification(res.message, 'error');
      }
    } catch (error) {
      notification(error, 'error');
    }
  }

  // anonymous function will bind to LoginPage
  setValue = componentState => {
    const { name, password } = componentState;
    // this === LoginPage
    this.setState({ name, password }, async () => {
      await this.login();
    });
  };

  // anonymous function will bind to LoginPage
  confirm = () => {
    this.setState({
      modal: { visible: true }
    });
    window.location.reload();
  };

  render() {
    const { visible } = this.state.modal;
    return (
      <div className="login-page">
        <Modal title="Notification" visible={visible} confirm={this.confirm} hasConfirm>
          <p className="content">Login successfully.</p>
        </Modal>
        <SignInSignUp setValue={this.setValue} isLogin />
      </div>
    );
  }
}

export default LoginPage;
