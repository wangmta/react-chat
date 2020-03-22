import React from 'react';
import './style.scss';
import classnames from 'classnames';

// takes in a component as an argument, returns an React Component
function ModalBase(Component) {
  return function(props) {
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
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export default ModalBase;
