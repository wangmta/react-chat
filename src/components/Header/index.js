import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import CreateGroupModal from '../CreateGroupModal';
import SeachBox from '../SearchBox';
import MyInfo from '../MyInfo';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroupModal: false
    }
    this._userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }

  confirm = ({ groupName, groupNotice }) =>{
    const { name, user_id } = this._userInfo;
    const data = {
      name: groupName,
      group_notice: groupNotice,
      creator_id = user_id
    }
    window.socket.emit('createGroup', data, response => {
      const { addGroupMessageAndInfo, updateHomePageList, homePageList, allGroupChats } = this.props;
      const members = [
        {user_id, name, status: 1}
      ];
      const groupInfo = Object.assign({members}, response);
      response.message = `${name}: group created!`;
      response.time = response.create_time;
      response.from_user = response.creator_id;
      updateHomePageList({ data: response, homePageList});
      addGroupMessageAndInfo({
        allGroupChats,
        message: {...response, name},
        groupId: response.to_group_id,
        groupInfo
      })
      this.props.history.push(`/group_chat/${response.to_group_id}`)
    })
  }

  openModal = ()=> {
    this.setState({showGroupModal: true})
  }

  cancel = ()=> {
    this.setState({showGroupModal: false})
  }

  render() {
    const { isSearching, searchFieldChange } = this.props;
    return <div className="header-wrapper">
      <MyInfo />
      <SeachBox searchFieldChange={searchFieldChange} isSearching={isSearching}/>
      <span className="add" onClick={this.openModal}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-add"/>
        </svg>
      </span>
      <CreateGroupModal title="Create A Group" modalVisible={this.state.showGroupModal} confirm={args => this.confirm(args)} hasCancel hasConfirm cancel={this.cancel}/>
    </div>
  }
}

Header.propTypes = {
  updateHomePageList: PropTypes.func,
  homePageList: PropTypes.array,
  allGroupChats: PropTypes.object,
  searchFieldChange: PropTypes.func,
  isSearching: PropTypes.bool,
  addGroupMessageAndInfo: PropTypes.func
}

Header.defaultProps = {
  updateHomePageList: undefined,
  homePageList: [],
  allGroupChats: new Map(),
  searchFieldChange: undefined,
  isSearching: false,
  addGroupMessageAndInfo(){}
}