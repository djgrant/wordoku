import React from 'react';
import { connect } from 'react-redux';
import LetterComponent from '../components/Letter';

var LetterContainer = props => (
  <LetterComponent {...props} />
);

var mapStateToProps = function (state, ownProps) {
  return {
    letter: state.matrix[ownProps.rowIndex][ownProps.colIndex]
  };
}

var mapDispatchToProps = function (dispatch) {
  return {
    handleClick: (rowIndex, colIndex, letter) => {
      dispatch({
        type: 'UPDATE_LETTER',
        rowIndex: rowIndex,
        colIndex: colIndex,
        letter: letter
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterContainer);
