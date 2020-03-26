import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Switch from 'rc-switch';
import Button from '../Button';
import Modal from '../Modal';
import Axios from 'axios';
import { GLOBAL_SETTINGS } from '../../pages/SettingPage/settingRecuder';
import './style.scss';

function openRepoUrl(history) {
  if (process.env.NODE_ENV === 'production') {
    history.push('/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  } else {
    window.open('https://im.aermin.top/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  }
}

function Setting(props) {
  const { initApp, history, globalSettings, setGlobalSettings } = props;
  const [logoutModalState, setLogoutModalState] = useState(false);
  const [githubStars, setGithubStars] = useState('--');

  const logout = () => {
    window.socket.disconnect();
    localStorage.removeItem('userInfo');
    initApp(false);
    history.push('/login');
  };

  useEffect(() => {
    Axios.get('https://api.github.com/repos/aermin/ghChat').then(res => {
      setGithubStars(res.data.stargazers_count);
    });
  });

  const _onChange = (type, value) => {
    setGlobalSettings({
      [type]: value
    });
  };

  return (
    <div className="setting">
      <Modal
        title="Are you sure to logout?"
        visible={logoutModalState}
        confirm={logout}
        hasCancel
        hasConfirm
        cancel={() => setLogoutModalState(false)}
      ></Modal>

      <div className="notification-config">
        <span>notification: </span>
        <Switch onChange={value => _onChange(GLOBAL_SETTINGS.NOTIFICATION, value)} />
      </div>

      <div
        className="github-star-render"
        onClick={() => window.open('https://github.com/aermin/ghChat')}
      >
        <svg className="icon github-icon" aria-hidden="true">
          <use xlinkHref="#icon-github-copy" />
        </svg>
        <span className="star-title">{`${githubStars} Stars`}</span>
      </div>

      <div
        className="contact"
        onClick={() => window.open('https://github.com/aermin/blog/issues/63')}
      >
        Enable PWA (install ghChat to Desktop)
      </div>
      <div className="contact" onClick={() => window.open('https://github.com/aermin/ghChat')}>
        Project GitHub Repo
      </div>
      <div className="contact" onClick={openRepoUrl(history)}>
        Project Community Chat
      </div>
      <Button clickFn={() => setLogoutModalState(true)} value="Logout" />
    </div>
  );
}

Setting.propTypes = {
  initApp: PropTypes.func,
  history: PropTypes.object.isRequired,
  globalSettings: PropTypes.object,
  setGlobalSettings: PropTypes.func
};

Setting.defaultProps = {
  initApp() {},
  globalSettings: {},
  setGlobalSettings() {}
};

export default withRouter(Setting);
