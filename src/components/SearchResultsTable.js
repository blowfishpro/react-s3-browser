import React, { Component } from 'react';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import SearchResultTitle from './SearchResultTitle';

export default class SearchResultsTable extends Component {
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
              <td className='objects-table__column_name'>
                <span>Name</span>
              </td>
              <td className='objects-table__column_last-modified'>
                <span>Last Modified</span>
              </td>
              <td className='objects-table__column_size'>
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
