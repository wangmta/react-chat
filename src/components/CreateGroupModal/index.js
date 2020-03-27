import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import notification from '../Notification';

export default class GroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: props.defaultGroupName,
      groupNotice: props.defaultGroupNotice
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  _confirm = () => {
    const { groupName, groupNotice } = this.state;
    if (!groupName || !groupNotice) {
      notification('Some information is missing.', 'error');
      return;
    }
    if (groupName === 'ghChat') {
      notification('This is a reserved group name, please use another name for group.', 'error');
      return;
    }
    this.props.comfirm({ groupName, groupNotice });
  };

  render() {
    const { modalVisible, cancel, title } = this.props;
    const { groupName, groupNotice } = this.state;
    return (
      <Modal
        title={title}
        visible={modalVisible}
        confirm={this._confirm}
        hasCancel
        hasConfirm
        cancel={cancel}
      >
        <div className="group-modal-content">
          <div>
            <span>Group Name: </span>
            <input
              type="text"
              name="groupName"
              value={groupName}
              onChange={this.handleChange}
              placeholder="12 chars max"
              maxLength="12"
            />
          </div>
          <div>
            <span>Group Notice: </span>
            <textarea
              name="groupNotice"
              rows="3"
              type="text"
              value={groupNotice}
              onChange={this.handleChange}
              placeholder="60 chars max"
              maxLength="60"
            ></textarea>
          </div>
        </div>
      </Modal>
    );
  }
}

GroupModal.propTypes = {
  modalVisible: PropTypes.bool,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  title: PropTypes.string,
  defaultGroupName: PropTypes.string,
  defaultGroupNotice: PropTypes.string
};

GroupModal.defaultProps = {
  modalVisible: false,
  confirm() {},
  cancel() {},
  title: '',
  defaultGroupName: '',
  defaultGroupNotice: ''
};
