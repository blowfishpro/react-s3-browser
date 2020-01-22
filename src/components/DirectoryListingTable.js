import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FileSize from './FileSize';
import NodeLink from './NodeLink';

export default class DirectoryListingTable extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    headerSortClasses: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { items, headerSortClasses, changeSort } = this.props;

    const rows = items.map(child => {
      return (
        <tr key={child.key}>
          <td><NodeLink node={child}>{child.name}</NodeLink></td>
          <td>{child.lastModified.toLocaleString()}</td>
          <td><FileSize size={child.size} /></td>
        </tr>
      );
    });

    return (
      <div className='objects-table'>
        <table>
          <thead>
            <tr>
              <td className='column_name'>
                <span>Name</span>
                <div
                  className={classNames('sort', headerSortClasses.name)}
                  onClick={() => changeSort('name')}
                />
              </td>
              <td className='column_last-modified'>
                <span>Last Modified</span>
                <div
                  className={classNames('sort', headerSortClasses.lastModified)}
                  onClick={() => changeSort('lastModified')}
                />
              </td>
              <td className='column_size'>
                <span>Size</span>
                <div
                  className={classNames('sort', headerSortClasses.size)}
                  onClick={() => changeSort('size')}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
