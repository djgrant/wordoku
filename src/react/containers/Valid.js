import React from 'react';
import { connect } from 'react-redux';
import ValidComponent from '../components/Valid';

var Valid = props => (<ValidComponent {...props} />)

var mapStateToProps = function (state) {
  return {
    validWordCount: state.validWordCount
  };
}

export default connect(mapStateToProps)(Valid);
