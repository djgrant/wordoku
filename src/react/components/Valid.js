import React from 'react';

var Valid = React.createClass({
  render() {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>Valid words: {this.props.validWordCount}</div>
    );
  }
});

export default Valid;
