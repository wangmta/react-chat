import './style.scss';
import React from 'react';
import Request from '../../utils/request';
import Modal from '../../components/Modal';
import notification from '../../components/Notification';
import SignInSignUp from '../../components/SignInSignUp';

export default class SignUpPage extends React.Component {
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

  register = async () => {
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
      const res = await Request.axiosRequest('post', '/api/v1/signup', { name, password });
      if (res && res.success) {
        // modal
        this.setState({ modal: { visible: true } });
      } else {
        notification(res.message, 'error');
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      let msg = !error.timeout ? 'INTERNET CONNECTION ERR' : error;
      notification(msg, 'error');
    }
  };

  setValue = componentState => {
    // get name, password from, SignInSignUp line 67
    const { name, password } = componentState;
    this.setState({ name, password }, async () => {
      await this.register();
    });
  };

  confirm = () => {
    this.setState({
      visible: false
    });

    this.props.history.push('/login');
  };

  render() {
    const { visible } = this.state.modal;
    return (
      <div className="signup">
        <Modal title="Notification" visible={visible} confirm={this.confirm} hasConfirm>
          <p className="content">Registration Successful.</p>
        </Modal>
        <SignInSignUp setValue={this.setValue} isLogin={false} />
      </div>
    );
  }
}
