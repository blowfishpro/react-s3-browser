import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import '../App.css';

export default @observer class App extends Component {
  static propTypes = {
    sortStore: PropTypes.object,
    directoriesStore: PropTypes.shape({
      hasDirectories: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      root: PropTypes.object,
      directories: PropTypes.array,
    }).isRequired,
    sortClassDeterminator: PropTypes.func,
    searchFilter: PropTypes.func,
    sortItems: PropTypes.func,
  }

  render() {
    const {
      sortStore,
      directoriesStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    } = this.props;

     if (directoriesStore.hasDirectories) {
      return (
        <DirectoriesRouter
          sortStore={sortStore}
          root={directoriesStore.root}
          directories={directoriesStore.directories}
          sortClassDeterminator={sortClassDeterminator}
          searchFilter={searchFilter}
          sortItems={sortItems}
        />
      );
    } else if (directoriesStore.error) {
      return <div className="error">Error loading bucket</div>;
    } else {
      return <div className="loading" />;
    }
  }
}
