import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PathSeparator from './PathSeparator';

export default class NodeLink extends Component {
  render() {
    const { node, children } = this.props;

    if (node.children) {
      return (
        <span>
          <Link to={node.path}>{children}</Link>
          <PathSeparator />
        </span>
      );
    } else {
      return(
        <span>
          <a href={node.url}>{children}</a>
        </span>
      );
    }
  }
}
