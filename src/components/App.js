import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import '../App.css';

export default @observer class App extends Component {
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
