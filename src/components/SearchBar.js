import React, { Component } from 'react';

export default class SearchBar extends Component {
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
