import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

export default function Button(props) {
  const { clickFn, value, className, disable } = props;
  return (
    <input
      type="button"
      onClick={clickFn}
      value={value}
      className={classnames('base-button', className, disable && 'disable')}
      disabled={disable}
    />
  );
}

Button.propTypes = {
  clickFn: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  disable: PropTypes.bool
};

Button.defaultProps = {
  clickFn: undefined,
  value: '',
  className: undefined,
  disable: false
};
