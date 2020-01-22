import React, { Component } from 'react';
import NodeLink from './NodeLink';

export default class PathNavigation extends Component {
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
