import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PathNavigation from './PathNavigation';

export default class NotFound extends Component {
  static propTypes = {
    root: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  };

  render() {
    const { root, path } = this.props;

    return (
      <div>
        <PathNavigation node={root} />
        <div className='not-found'>
          <div className='content'>
            <div className='message'>The specified path was not found:</div>
            <div className='path'>{path}</div>
          </div>
        </div>
      </div>
    );
  }
}
