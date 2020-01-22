import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';
import IndexView from './IndexView';
import PathNavigation from './PathNavigation';
import SearchBar from './SearchBar';
import DirectoryListingTable from './DirectoryListingTable';
import SearchResultsTable from './SearchResultsTable';

describe(IndexView, () => {
  it('renders a path navigation', () => {
    const node = { some: 'stuff' };
    const wrapper = shallow(
      <IndexView
        node={node}
        sortStore={{}}
        sortClassDeterminator={jest.fn()}
        searchFilter={jest.fn()}
        sortItems={jest.fn()}
      />
    );

    const pathNavigation = wrapper.find(PathNavigation);
    expect(pathNavigation).toHaveLength(1);
    expect(pathNavigation).toHaveProp({ node: node });
  });

  describe('search bar', () => {
    it('gives the node name if the node has a parent', () => {
      const node = { name: 'some node', parent: {} };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn()}
          searchFilter={jest.fn()}
          sortItems={jest.fn()}
        />
      );
      const searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ nodeName: 'some node' });
    });

    it('does not give the node name if the node has no parent', () => {
      const node = { name: 'some node' };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn()}
          searchFilter={jest.fn()}
          sortItems={jest.fn()}
        />
      );
      const searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ nodeName: null });
    });

    it('changes the search term when a change is triggered', () => {
      const node = { name: 'some node' };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn()}
          searchFilter={jest.fn()}
          sortItems={jest.fn()}
        />
      );
      let searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ searchTerm: '' });

      searchBar.props().onChange('search term');

      searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ searchTerm: 'search term' });
    });
  });

  it('renders a directory listing table if no search term is specified', () => {
    const node = { children: ['child1', 'child2'] };
    const sortItems = Sinon.stub();
    sortItems.withArgs(['child1', 'child2'], 'someSortBy', 'someSortOrder').returns(['sorted1', 'sorted2']);
    const sortClassDeterminator = Sinon.stub();
    sortClassDeterminator.withArgs('someSortBy', 'someSortOrder').returns({ sort: 'classes' });
    const sortStore = { sortBy: 'someSortBy', sortOrder: 'someSortOrder', changeSort: jest.fn() };
    const wrapper = shallow(
      <IndexView
        node={node}
        sortStore={sortStore}
        sortClassDeterminator={sortClassDeterminator}
        searchFilter={jest.fn()}
        sortItems={sortItems}
      />
    );

    const directoryListingTable = wrapper.find(DirectoryListingTable);
    expect(directoryListingTable).toHaveLength(1);
    expect(directoryListingTable).toHaveProp({
      items: ['sorted1', 'sorted2'],
      headerSortClasses: { sort: 'classes' },
    });

    directoryListingTable.props().changeSort('newSortBy');
    expect(sortStore.changeSort).toHaveBeenCalledWith('newSortBy');
  });

  it('renders a search results table if no search term is specified', () => {
    const node = { some: 'stuff' };
    const searchFilter = Sinon.stub();
    searchFilter.withArgs('search term', node).returns(['item1', 'item2']);
    const wrapper = shallow(
      <IndexView
        node={node}
        sortStore={{}}
        sortClassDeterminator={jest.fn()}
        searchFilter={searchFilter}
        sortItems={jest.fn()}
      />
    );

    wrapper.find(SearchBar).props().onChange('search term');

    const searchResultsTable = wrapper.find(SearchResultsTable);
    expect(searchResultsTable).toHaveLength(1);
    expect(searchResultsTable).toHaveProp({ items: ['item1', 'item2'] });
  });
});
