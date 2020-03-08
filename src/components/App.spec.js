import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import DirectoriesRouter from './DirectoriesRouter';

describe(App, () => {
  it('Renders the router if the store has directories', () => {
    const sortStore = { name: 'sortStore' };
    const directories = [{ key: 'dir1', path: '/dir1'}, { key: 'dir1', path: '/dir2' }];
    const directoriesStore = { hasDirectories: true, error: false, directories };
    const sortClassDeterminator = jest.fn();
    const searchFilter = jest.fn();
    const sortItems = jest.fn();
    const wrapper = shallow(
      <App
        sortStore={sortStore}
        directoriesStore={directoriesStore}
        sortClassDeterminator={sortClassDeterminator}
        searchFilter={searchFilter}
        sortItems={sortItems}
      />
    );

    const router = wrapper.find(DirectoriesRouter);
    expect(router).toHaveLength(1);
    expect(router).toHaveProp({
      directories,
      sortStore,
      sortClassDeterminator,
      searchFilter,
      sortItems,
    });
  });

  it('Renders an error if the store reports one', () => {
    const wrapper = shallow(
      <App
        sortStore={{}}
        directoriesStore={{ hasDirectories: false, error: true, directories: null }}
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
        directoriesStore={{ hasDirectories: false, error: false }}
        sortClassDeterminator={jest.fn()}
      />
    );

    expect(wrapper).toMatchElement(
      <div className="loading" />,
      { ignoreProps: false },
    );
  });
});
