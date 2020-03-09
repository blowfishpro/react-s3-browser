import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { shallow } from 'enzyme';
import DirectoriesRouter from './DirectoriesRouter';
import IndexView from './IndexView';
import NotFound from './NotFound';

describe(DirectoriesRouter, () => {
  it('renders', () => {
    const root = { key: '/', path: '/' };
    const directories = [
      { key: 'a', path: '/a', name: 'a', children: [] },
      { key: 'b', path: '/b', name: 'b', children: [] },
      { key: 'c', path: '/c', name: 'c', children: [] },
    ];
    const sortStore = { name: 'sortStore' };
    const sortClassDeterminator = jest.fn();
    const searchFilter = jest.fn();
    const sortItems = jest.fn();
    const wrapper = shallow(
      <DirectoriesRouter
        root={root}
        directories={directories}
        sortStore={sortStore}
        sortClassDeterminator={sortClassDeterminator}
        searchFilter={searchFilter}
        sortItems={sortItems}
      />
    );

    const router = wrapper.find(Router);
    expect(router).toHaveLength(1);
    const routeSwitch = router.find(Switch);
    expect(routeSwitch).toHaveLength(1);
    const routes = routeSwitch.find(Route);
    expect(routes).toHaveLength(4);

    expect(routes.at(0)).toHaveProp({ exact: true, path: '/a' });
    const renderedNode0 = shallow(
      <div>
        {routes.at(0).props().render()}
      </div>
    );
    const renderedIndexView0 = renderedNode0.find(IndexView);
    expect(renderedIndexView0).toHaveLength(1);
    expect(renderedIndexView0).toHaveProp({
      node: directories[0],
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    });

    expect(routes.at(1)).toHaveProp({ exact: true, path: '/b' });
    const renderedNode1 = shallow(
      <div>
        {routes.at(1).props().render()}
      </div>
    );
    const renderedIndexView1 = renderedNode1.find(IndexView);
    expect(renderedIndexView1).toHaveLength(1);
    expect(renderedIndexView1).toHaveProp({
      node: directories[1],
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    });

    expect(routes.at(2)).toHaveProp({ exact: true, path: '/c' });
    const renderedNode2 = shallow(
      <div>
        {routes.at(2).props().render()}
      </div>
    );
    const renderedIndexView2 = renderedNode2.find(IndexView);
    expect(renderedIndexView2).toHaveLength(1);
    expect(renderedIndexView2).toHaveProp({
      node: directories[2],
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    });

    expect(routes.at(3)).toHaveProp({ path: '*' });
    const renderedNode3 = shallow(
      <div>
        {routes.at(3).props().render({ location: { pathname: '/not/found' }})}
      </div>
    );
    const notFound = renderedNode3.find(NotFound);
    expect(notFound).toHaveLength(1);
    expect(notFound).toHaveProp({ root: root, path: '/not/found' });
  });
});
