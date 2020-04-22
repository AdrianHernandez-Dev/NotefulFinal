import React from 'react';
import PropTypes from 'prop-types';

export default function ValiationError(props) {
  if (props.hasError) {
    return <h3 className="error">{props.message}</h3>
  }
  return <></>
}

ValidationError.propTypes = {
  hasError: PropTypes.string
};