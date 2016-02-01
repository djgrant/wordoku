import React, { PropTypes } from 'react';

var Letter = React.createClass({
  propTypes: {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number
  },

  onClick: function () {
    var letter = window.prompt('Choose a letter');
    this.props.handleClick(
      this.props.rowIndex,
      this.props.colIndex,
      letter
    );
  },

  render() {
    var emptyClass = this.props.letter !== " " ? '' : 'empty';
    return (
      <div
        className={`letter ${emptyClass}`}
        onClick={this.onClick}>
        {this.props.letter}
      </div>
    );
  }
});

export default Letter;
