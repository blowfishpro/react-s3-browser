import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import SearchResultTitle from './SearchResultTitle';

export default class SearchResultsTable extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        key: PropTypes.string.isRequired,
        lastModified: PropTypes.instanceOf(Date).isRequired,
        size: PropTypes.number.isRequired,
      }).isRequired,
      matchData: PropTypes.array.isRequired,
    }).isRequired).isRequired
  }

  render() {
    const { items } = this.props;

    const rows = items
    .map(child => {
      const { node, matchData } = child;

      return (
        <tr key={node.key}>
          <td>
            <NodeLink node={node}>
              <SearchResultTitle matchData={matchData} />
            </NodeLink>
          </td>
          <td>{node.lastModified.toLocaleString()}</td>
          <td><FileSize size={node.size} /></td>
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
              </td>
              <td className='column_last-modified'>
                <span>Last Modified</span>
              </td>
              <td className='column_size'>
                <span>Size</span>
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
