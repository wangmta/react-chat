import React from 'react';
import RcNotification from 'rc-notification';
import './style.scss';

function addIcon(msg, type) {
  let content;
  if (type === 'success') {
    content = (
      <div className="all-icon">
        <svg className="icon" aria-hidden="true"></svg>
      </div>
    );
  }
}

export default function notification(msg, type, duration) {
  const content = addIcon(msg, type);
  RcNotification.newInstance({}, notification => {
    notification.notice({ content, duration });
  });
}
