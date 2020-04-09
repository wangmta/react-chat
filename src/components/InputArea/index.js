import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import Fuse from 'fuse.js';
import request from '../../utils/request';
import notification from '../Notification';
import debounce from '../../utils/debounce';
import { shareAction } from '../../redux/actions/shareAction';
import './style.scss';

function getPlaceholder(isRobotChat) {
  switch (true) {
    case /group_chat/.test(window.location.href):
      return 'Enter to send/Copy & paste to send images/@contacts';
    case isRobotChat:
      return 'Enter to send';
    default:
      return 'Enter to send/Copy & paste to send images';
  }
}

export default class InputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
      showEmojiPicker: false,
      relatedMembers: []
    };
    this._uploadToken = null;
    this._onPaste = props.isRobotChat ? () => {} : debounce();
  }

  _fetchUploadToken = async () => {
    if (!this._uploadToken) {
      this._uploadToken = await request.socketEmitAndGetResponse('getUploadToken');
    }
  };

  _sendMessage = ({ attachments = [], message }) => {
    const { sendMessage } = this.props;
    const { inputMsg } = this.state;
    sendMessage(message || inputMsg, attachments);
    this.setState({ inputMsg: '' });
    this.nameInput.focus();
  };

  _paste = async event => {
    const clipboardData = event.clipboardData || event.originalEvent.clipboardData;
    const items = clipboardData && clipboardData.items;
    if (!items) return;
    const len = items.length;
    for (let i = 0; i < len; i += 1) {
      if (items[i].kind === 'file') {
        event.preventDefault();
        const file = items[i].getAsFile();
        if (!file) return;
        const limitSize = 1000 * 1024 * 2; // 2MB
        if (file.size > limitSize) {
          notification('File size cannot be greater than 2MB', 'warn', 2);
          return;
        }
        await this._fetchUploadToken();
        upload(file, this._uploadToken, fileUrl => {
          const type = file.type.split('/')[0];
          const attachments = [{ fileUrl, type, name: file.name }];
        });
      }
    }
  };
}
