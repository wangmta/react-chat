import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ModalBase from '../ModalBase';

function confirmCancelRender(props) {
  const { hasCancel, hasConfirm, confirm, cancel } = props;
  if (hasCancel && hasConfirm) {
    return (
      <div className="button-two">
        <p onClick={cancel}>Cancel</p>
        <p onClick={confirm}>Confirm</p>
      </div>
    );
  }
  if (hasConfirm || hasCancel) {
    return (
      <div className="button-one">
        {hasCancel && <p onClick={cancel}>Cancel</p>}
        {hasConfirm && <p onClick={confirm}>Confirm</p>}
      </div>
    );
  }
  return null;
}

function dialogRender(props) {
  const { title, children } = props;
  return (
    <div className="dialog-render">
      <h3 className="title">{title}</h3>
      {children}
      {confirmCancelRender({ ...props })}
    </div>
  );
}

confirmCancelRender.propTypes = {
  hasCancel: PropTypes.bool,
  hasConfirm: PropTypes.bool,
  cancel: PropTypes.func,
  confirm: PropTypes.func
};

confirmCancelRender.defaultProps = {
  hasCancel: false,
  hasConfirm: false,
  cancel: undefined,
  confirm: undefined
};

dialogRender.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

dialogRender.defaultProps = {
  title: '',
  children: undefined
};

const ModalDialogRender = ModalBase(dialogRender);

export default function Modal(props) {
  return <ModalDialogRender {...props} />;
}
// the props passed from ModalDialogRender(ModalBase returned React component) => dialogRender => confirmCancelRender
