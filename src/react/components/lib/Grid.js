import React from 'react';
import classNames from 'classnames';

export var Col = React.createClass({
  propTypes: {
    numOfCols: React.PropTypes.number,
    className: React.PropTypes.string
  },

  getDefaultProps: () => ({
    numOfCols: 1
  }),

  render: function () {
    if (!this.props.children) {
      return null;
    }

    var defaultClassName = `col-1-${this.props.numOfCols}`;
    var regex = /(col-\d-\d)/g;
    var needsColClass = !this.props.className || !regex.exec(this.props.className);
    var className = classNames({ [defaultClassName] : needsColClass }, this.props.className);

    return (
      <div {...Object.assign({}, this.props, { className })}>
        {this.props.children}
      </div>
    );
  }
});

export var Row = React.createClass({
  getEmptyChildren: function () {
    if (this.props.children) {
      return React.Children.map(this.props.children, function (item) {
        return typeof item.props.children === 'undefined' || item.props.children === null ? true : null;
      });
    }

    return [];
  },

  hasNoChildren: function () {
    if (this.props.children) {
      var childLength = React.Children.count(this.props.children) || 0;
      return this.getEmptyChildren().length === childLength;
    }

    return true;
  },

  getNewChildren: function () {
    var newChildren = [];

    if (this.props.children) {
      var childLength = React.Children.count(this.props.children) - this.getEmptyChildren().length || 0;
      newChildren = React.Children.map(this.props.children, function (item, index) {
        return React.cloneElement(item, {
          key: index,
          numOfCols: childLength
        });
      });
    }

    return newChildren;
  },

  render: function () {
    if (this.hasNoChildren()) {
      return null;
    }

    var className = classNames('row', this.props.className);;
    var newChildren = this.getNewChildren();

    return (
      <div
        {...Object.assign({}, this.props, { className })}>
        {newChildren}
      </div>
    );
  }
});
