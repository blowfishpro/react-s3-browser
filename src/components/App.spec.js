import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import DirectoriesRouter from './DirectoriesRouter';

describe(App, () => {
  it('Renders the router if the store has directories', () => {
    const sortStore = { name: 'sortStore' };
    const root = { key: '/', path: '/' };
    const directories = [{ key: 'dir1', path: '/dir1'}, { key: 'dir1', path: '/dir2' }];
    const appStore = { isLoading: false, isLoaded: true, isError: false, root, directories, basePath: '/some/path' };
    const sortClassDeterminator = jest.fn();
    const searchFilter = jest.fn();
    const sortItems = jest.fn();
    const basePath = '/some/path';
    const wrapper = shallow(
      <App
        sortStore={sortStore}
        appStore={appStore}
        sortClassDeterminator={sortClassDeterminator}
        searchFilter={searchFilter}
        sortItems={sortItems}
      />
    );

    const router = wrapper.find(DirectoriesRouter);
    expect(router).toHaveLength(1);
    expect(router).toHaveProp({
      root,
      directories,
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
      basePath,
    });
  });

  it('Renders an error if the store reports one', () => {
    const wrapper = shallow(
      <App
        sortStore={{}}
        appStore={{ isLoading: false, isLoaded: false, isError: true, error: 'this is the error' }}
        sortClassDeterminator={jest.fn()}
      />
    );

    expect(wrapper).toMatchElement(
      <div className="error">Error loading bucket</div>,
      { ignoreProps: false },
    );
  });

  it('Renders a loading screen if results are still loading', () => {
    const wrapper = shallow(
      <App
        sortStore={{}}
        appStore={{ isLoading: true, isLoaded: false, isError: false }}
        sortClassDeterminator={jest.fn()}
      />
    );

    expect(wrapper).toMatchElement(
      <div className="loading" />,
      { ignoreProps: false },
    );
  });
});
