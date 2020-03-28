import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import ModalBase from '../ModalBase';
import UserAvatar from '../UserAvatar';
import Button from '../Button';
import notification from '../Notification';
import './style.scss';

function _openUrl(url) {
  const formatUrl = /https:\/\/|http:\/\//.test(url) ? url : `https://${url}`;
  window.open(formatUrl);
}

class userInfoRender extends Component {
  render() {
    const {
      userInfo,
      goToChat,
      isContact,
      deleteContact,
      showContactButton,
      showShareIcon,
      showShareModal
    } = this.props;
    const { name, location, website, github, intro, avatar, company } = userInfo;

    return (
      <div className="user-info">
        <UserAvatar name={name} src={avatar} size="50" />
        {name && <p className="name">{name}</p>}
        {intro && <p>{`Intro: ${intro}`}</p>}
        {location && <p>{`From: ${location}`}</p>}
        {company && <p>{`Company: ${company}`}</p>}
        {website && (
          <p className="website" onClick={() => _openUrl(website)}>{`Website: ${website}`}</p>
        )}
        {github && <p className="github" onClick={_openUrl(github)}>{`github: ${github}`}</p>}
        {showContactButton && (
          <Button
            className={classnames('personal-info-btn', 'chat-btn')}
            clickFn={goToChat}
            value="send private messages"
          />
        )}
        {isContact && (
          <Button
            className={classnames('personal-info-btn', 'delete-btn')}
            clickFn={deleteContact}
            value="delete contact"
          />
        )}
        {showShareIcon && (
          <svg onClick={showShareModal} className="icon share-icon" aria-hidden="true">
            <use xlinkHref="#icon-share" />
          </svg>
        )}
      </div>
    );
  }
}

const ModalRender = ModalBase(userInfoRender);

class PersonalInfo extends React.Component {
  goToChat = () => {
    this.props.history.push(`/private_chat/${this.props.userInfo.user_id}`);
    this.props.hide();
  };

  deleteContact = () => {
    const myInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {
      userInfo,
      deleteHomePageList,
      homePageList,
      deletePrivateChat,
      allPrivateChats
    } = this.props;
    window.socket.emit(
      'deleteContact',
      {
        from_user: myInfo.user_id,
        user_to_delete: userInfo.user_id
      },
      response => {
        if (response.code === 200) {
          deleteHomePageList({ homePageList, chatId: userInfo.user_id });
          deletePrivateChat({ allPrivateChats, chatId: userInfo.user_id });
          this.props.hide();
          notification('Contact Deleted.', 'success', 2);
        }
      }
    );
  };

  get isContact() {
    return (
      this.props.homePageList &&
      this.props.homePageList.find(item => item.user_id === this.props.userInfo.user_id)
    );
  }

  render() {
    const {
      userInfo,
      modalVisible,
      hide,
      showContactButton,
      showShareIcon,
      showShareModal
    } = this.props;
    return (
      <ModalRender
        userInfo={userInfo}
        visible={modalVisible}
        cancel={hide}
        isContact={this.isContact}
        deleteContact={this.deleteContact}
        goToChat={this.goToChat}
        showContactButton={showContactButton}
        showShareIcon={showShareIcon}
        showShareModal={showShareModal}
        chatId={userInfo.user_id}
      />
    );
  }
}

PersonalInfo.propTypes = {
  userInfo: PropTypes.object,
  hide: PropTypes.func,
  modalVisible: PropTypes.bool,
  homePageList: PropTypes.array,
  deleteHomePageList: PropTypes.func,
  deletePrivateChat: PropTypes.func,
  allPrivateChats: PropTypes.instanceOf(Map),
  showContactButton: PropTypes.bool,
  showShareIcon: PropTypes.bool,
  showShareModal: PropTypes.func
};

PersonalInfo.defaultProps = {
  userInfo: {},
  hide() {},
  modalVisible: false,
  homePageList: undefined,
  deleteHomePageList() {},
  deletePrivateChat() {},
  allPrivateChats: new Map(),
  showContactButton: true,
  showShareIcon: false,
  showShareModal() {}
};

export default withRouter(PersonalInfo);
