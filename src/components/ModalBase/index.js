import React from 'react';
import './style.scss';
import classnames from 'classnames';

function ModalBase(Component) {
  return props => {
    const { visible = false, cancel, modalWrapperClassName } = props;
    return (
      <div className={classnames('modal', visible ? 'showModalBase' : 'hideModalBase')}>
        <div onClick={cancel} className="backdrop"></div>
        <div className={classnames('modalWrapper', modalWrapperClassName)}>
          {cancel && (
            <span onClick={cancel} className="xIcon">
              x
            </span>
          )}
        </div>
      </div>
    );
  };
}
