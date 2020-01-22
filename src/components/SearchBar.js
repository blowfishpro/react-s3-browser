import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    nodeName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { searchTerm, nodeName, onChange } = this.props;
    const placeholder = nodeName ? `Search in ${nodeName}` : 'Search';
    return (
      <div className='search-bar'>
        <input value={searchTerm} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    );
  }
}
