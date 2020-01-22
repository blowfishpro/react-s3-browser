import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NodeLink from './NodeLink';

export default class PathNavigation extends Component {
  static propTypes = {
    node: PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.object,
    }).isRequired,
  }

  render() {
    const { node } = this.props;
    const parentLinks = [];
    var currentNode = node;

    do {
      parentLinks.unshift(<NodeLink node={currentNode} key={currentNode.key}>{currentNode.name}</NodeLink>);
      currentNode = currentNode.parent;
    } while (currentNode);

    return <div className='path-navigation'>{parentLinks}</div>;
  }
}
