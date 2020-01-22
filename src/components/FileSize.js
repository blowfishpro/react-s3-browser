import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SIZE_SUFFIXES = ['B', 'KB', 'MB', 'GB', 'TB'];

const displaySize = function(size) {
  let i;
  for (i = 0; i < SIZE_SUFFIXES.length - 1; i++) {
    if (size < 1024) return { size, suffix: SIZE_SUFFIXES[i] };
    size /= 1024;
  }

  return { size, suffix: SIZE_SUFFIXES[i] };
}

export default class FileSize extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
  }

  render() {
    let { size, suffix } = displaySize(this.props.size);
    return(
      <div className='file-size'>
        <span className='file-size__number'>{Math.round(size)}</span>
        <span className='file-size__suffix'>{suffix}</span>
      </div>
    );
  }
}
