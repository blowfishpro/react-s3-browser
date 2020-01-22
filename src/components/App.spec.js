import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import DirectoriesRouter from './DirectoriesRouter';

describe(App, () => {
  it('Renders the router if the store has directories', () => {
    const sortStore = { name: 'sortStore' };
    const directoriesStore = { hasDirectories: true, directories: [1, 2, 3] };
    const sortClassDeterminator = { name: 'sortClassDeterminator' };
    const searchFilter = { name: 'searchFilter' };
    const sortItems = { name: 'sortItems' };
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
      directories: [1, 2, 3],
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
        directoriesStore={{ hasDirectories: false, error: true }}
        sortClassDeterminator={{}}
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
        sortClassDeterminator={{}}
      />
    );

    expect(wrapper).toMatchElement(
      <div className="loading" />,
      { ignoreProps: false },
    );
  });
});
