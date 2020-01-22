import React from 'react';
import { shallow } from 'enzyme';
import DirectoryListingTable from './DirectoryListingTable';
import FileSize from './FileSize';
import NodeLink from './NodeLink';

describe(DirectoryListingTable, () => {
  it('has the correct header', () => {
    const headerSortClasses = {
      name: 'name-header-sort-class',
      lastModified: 'last-modified-header-sort-class',
      size: 'size-header-sort-class',
    };
    const changeSort = jest.fn();
    const wrapper = shallow(
      <DirectoryListingTable
        headerSortClasses={headerSortClasses}
        changeSort={changeSort}
        items={[]}
      />
    );
    const headerRow = wrapper.find('thead').find('tr');
    expect(headerRow).toHaveLength(1);
    const cells = headerRow.find('td');
    expect(cells).toHaveLength(3);

    expect(cells.at(0).text()).toEqual('Name');
    const nameSortButton = cells.at(0).find('.sort');
    expect(nameSortButton).toHaveLength(1);
    expect(nameSortButton).toHaveClassName('name-header-sort-class');
    nameSortButton.simulate('click');
    expect(changeSort).toHaveBeenCalledWith('name');

    expect(cells.at(1).text()).toEqual('Last Modified');
    const lastModifiedSortButton = cells.at(1).find('.sort');
    expect(lastModifiedSortButton).toHaveLength(1);
    expect(lastModifiedSortButton).toHaveClassName('last-modified-header-sort-class');
    lastModifiedSortButton.simulate('click');
    expect(changeSort).toHaveBeenCalledWith('lastModified');

    expect(cells.at(2).text()).toEqual('Size');
    const sizeSortButton = cells.at(2).find('.sort');
    expect(sizeSortButton).toHaveLength(1);
    expect(sizeSortButton).toHaveClassName('size-header-sort-class');
    sizeSortButton.simulate('click');
    expect(changeSort).toHaveBeenCalledWith('size');
  });

  it('renders a body row for each item', () => {
    const items = [
      { name: 'item0', key: 'item0', size: 10, lastModified: new Date('2000-01-01 00:00:00 +0000') },
      { name: 'item1', key: 'item1', size: 11, lastModified: new Date('2000-01-01 00:00:01 +0000') },
      { name: 'item2', key: 'item2', size: 12, lastModified: new Date('2000-01-01 00:00:02 +0000') },
    ]
    const wrapper = shallow(
      <DirectoryListingTable
        headerSortClasses={{}}
        items={items}
      />
    );
    const tableRows = wrapper.find('tbody').find('tr');
    expect(tableRows).toHaveLength(3);

    const cells0 = tableRows.at(0).find('td');
    expect(cells0).toHaveLength(3);
    expect(cells0.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells0.at(0).find(NodeLink).children()).toHaveText('item0');
    expect(cells0.at(0).find(NodeLink)).toHaveProp({ node: items[0] });
    expect(cells0.at(1)).toHaveText(new Date('2000-01-01 00:00:00 +0000').toLocaleString());
    expect(cells0.at(2).find(FileSize)).toHaveLength(1);
    expect(cells0.at(2).find(FileSize)).toHaveProp({ size: 10 });

    const cells1 = tableRows.at(1).find('td');
    expect(cells1).toHaveLength(3);
    expect(cells1.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells1.at(0).find(NodeLink).children()).toHaveText('item1');
    expect(cells1.at(0).find(NodeLink)).toHaveProp({ node: items[1] });
    expect(cells1.at(1)).toHaveText(new Date('2000-01-01 00:00:01 +0000').toLocaleString());
    expect(cells1.at(2).find(FileSize)).toHaveLength(1);
    expect(cells1.at(2).find(FileSize)).toHaveProp({ size: 11 });

    const cells2 = tableRows.at(2).find('td');
    expect(cells2).toHaveLength(3);
    expect(cells2.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells2.at(0).find(NodeLink).children()).toHaveText('item2');
    expect(cells2.at(0).find(NodeLink)).toHaveProp({ node: items[2] });
    expect(cells2.at(1)).toHaveText(new Date('2000-01-01 00:00:02 +0000').toLocaleString());
    expect(cells2.at(2).find(FileSize)).toHaveLength(1);
    expect(cells2.at(2).find(FileSize)).toHaveProp({ size: 12 });
  });
});
