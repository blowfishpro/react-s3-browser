import React, { Component } from 'react';

export default class SearchResultTitle extends Component {
  render() {
    const { matchData } = this.props;

    var first = true;
    var i = 0;
    const path = matchData.map(parts => {
      const result = [];
      if (first) first = false;
      else result.push(<span key={i++}>/</span>);
      parts.forEach(part => {
        const style = part.match ? { fontWeight: 'bold' } : {}
        result.push(<span key={i++} style={style}>{part.fragment}</span>);
      });
      return result;
    });

    return <span>{path}</span>;
  }
}
