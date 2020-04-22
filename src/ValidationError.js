import React from 'react';
import PropTypes from 'prop-types';

export default function ValiationError(props) {
  if (props.hasError) {
    return <h3 className="error">{props.message}</h3>
  }
  return <></>
}

ValiationError.propTypes = {
  hasError: PropTypes.string
};
