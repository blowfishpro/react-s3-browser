import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import '../App.css';

export default @observer class App extends Component {
  static propTypes = {
    sortStore: PropTypes.object,
    appStore: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      isLoaded: PropTypes.bool.isRequired,
      isError: PropTypes.bool.isRequired,
      error: PropTypes.string,
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
      appStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    } = this.props;

    if (appStore.isLoading) {
      return <div className="loading" />;
    } else if (appStore.isError) {
      return <div className="error">{appStore.error}</div>;
    } else if (appStore.isLoaded) {
      return (
        <DirectoriesRouter
          sortStore={sortStore}
          root={appStore.root}
          directories={appStore.directories}
          sortClassDeterminator={sortClassDeterminator}
          searchFilter={searchFilter}
          sortItems={sortItems}
          basePath={appStore.basePath}
        />
      );
    } else {
      throw new Error('unreachable state');
    }
  }
}
