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
    const node = { name: 'stuff', key: 'stuff', children: [] };
    const wrapper = shallow(
      <IndexView
        node={node}
        sortStore={{}}
        sortClassDeterminator={jest.fn().mockReturnValue({ name: 'a', lastModified: 'b', size: 'c' })}
        searchFilter={jest.fn()}
        sortItems={jest.fn().mockReturnValue([])}
      />
    );

    const pathNavigation = wrapper.find(PathNavigation);
    expect(pathNavigation).toHaveLength(1);
    expect(pathNavigation).toHaveProp({ node: node });
  });

  describe('search bar', () => {
    it('gives the node name if the node has a parent', () => {
      const node = { name: 'some node', key: 'stuff', parent: {}, children: [] };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn().mockReturnValue({ name: 'a', lastModified: 'b', size: 'c' })}
          searchFilter={jest.fn()}
          sortItems={jest.fn().mockReturnValue([])}
        />
      );
      const searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ nodeName: 'some node' });
    });

    it('does not give the node name if the node has no parent', () => {
      const node = { name: '', key: '/', children: [] };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn().mockReturnValue({ name: 'a', lastModified: 'b', size: 'c' })}
          searchFilter={jest.fn()}
          sortItems={jest.fn().mockReturnValue([])}
        />
      );
      const searchBar = wrapper.find(SearchBar);
      expect(searchBar).toHaveLength(1);
      expect(searchBar).toHaveProp({ nodeName: null });
    });

    it('changes the search term when a change is triggered', () => {
      const node = { name: 'stuff', key: 'stuff', children: [] };
      const wrapper = shallow(
        <IndexView
          node={node}
          sortStore={{}}
          sortClassDeterminator={jest.fn().mockReturnValue({ name: 'a', lastModified: 'b', size: 'c' })}
          searchFilter={jest.fn().mockReturnValue([])}
          sortItems={jest.fn().mockReturnValue([])}
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
    const children = [
      { key: 'child0key', name: 'child0name', size: 0 },
      { key: 'child1key', name: 'child1name', size: 1 },
    ];
    const sortedChildren = [
      { key: 'sorted0key', name: 'sorted0name', size: 0 },
      { key: 'sorted1key', name: 'sorted1name', size: 1 },
    ];
    const node = { name: 'stuff', key: 'stuff', children };
    const sortItems = Sinon.stub();
    sortItems.withArgs(children, 'someSortBy', 'someSortOrder').returns(sortedChildren);
    const sortClassDeterminator = Sinon.stub();
    sortClassDeterminator.withArgs('someSortBy', 'someSortOrder').returns({ name: 'a', lastModified: 'b', size: 'c' });
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
      items: sortedChildren,
      headerSortClasses: { name: 'a', lastModified: 'b', size: 'c' },
    });

    directoryListingTable.props().changeSort('newSortBy');
    expect(sortStore.changeSort).toHaveBeenCalledWith('newSortBy');
  });

  it('renders a search results table if no search term is specified', () => {
    const node = { name: 'stuff', key: 'stuff', children: [] };
    const filteredItems = [
      {
        node: {
          key: 'item0',
          lastModified: new Date('2000-01-01 00:00:00 +0000'),
          size: 0,
        },
        matchData: ['matchData0'],
      },
      {
        node: {
          key: 'item1',
          lastModified: new Date('2000-01-01 00:00:01 +0000'),
          size: 1,
        },
        matchData: ['matchData1'],
      },
    ];
    const searchFilter = Sinon.stub();
    searchFilter.withArgs('search term', node).returns(filteredItems);
    const wrapper = shallow(
      <IndexView
        node={node}
        sortStore={{}}
        sortClassDeterminator={jest.fn().mockReturnValue({ name: 'a', lastModified: 'b', size: 'c' })}
        searchFilter={searchFilter}
        sortItems={jest.fn().mockReturnValue([])}
      />
    );

    wrapper.find(SearchBar).props().onChange('search term');

    const searchResultsTable = wrapper.find(SearchResultsTable);
    expect(searchResultsTable).toHaveLength(1);
    expect(searchResultsTable).toHaveProp({ items: filteredItems });
  });
});
