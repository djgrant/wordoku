import React, { PropTypes } from 'react';
import Letter from '../containers/Letter';
import { Col, Row } from './lib/Grid';

var Grid = React.createClass({
  propTypes: {
    matrix: PropTypes.array
  },
  render() {
    return (
      <div className="grid rows-spaced">
        {
          this.props.matrix.map((cols, rI) => (
            <div className="row cols-spaced" key={rI}>
              {
                cols.map((col, cI) => (
                  <div key={cI} className={`col-1-${cols.length}`}>
                    <Letter
                      rowIndex={rI}
                      colIndex={cI}
                      letter={col} />
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
});

export default Grid;
