import React from 'react';
import { connect } from 'react-redux';
import GridComponent from '../components/Grid';

var Grid = props => (<GridComponent {...props} />)

var mapStateToProps = function (state) {
  return {
    matrix: state.matrix
  };
}

export default connect(mapStateToProps)(Grid);
