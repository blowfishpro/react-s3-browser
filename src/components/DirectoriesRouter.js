import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexView from './IndexView';

export default class DirectoriesRouter extends Component {
  render() {
    const {
      directories,
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    } = this.props;

    const dirRoutes = directories.map(dir => {
      const render = props =>
        <IndexView {...props}
          node={dir}
          sortStore={sortStore}
          sortClassDeterminator={sortClassDeterminator}
          searchFilter={searchFilter}
          sortItems={sortItems}
        />;
      return <Route exact key={dir.key} path={dir.path} render={render} />;
    })

    return (
      <Router>
        <Switch>
          {dirRoutes}
        </Switch>
      </Router>
    );
  }
}
