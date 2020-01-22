import React from 'react';
import { shallow } from 'enzyme';
import SearchResultsTable from './SearchResultsTable';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import SearchResultTitle from './SearchResultTitle';

describe(SearchResultsTable, () => {
  it ('has a header', () => {
    const wrapper = shallow(
      <SearchResultsTable items={[]} />
    );

    const headerCells = wrapper.find('thead').find('tr').find('td');
    expect(headerCells).toHaveLength(3);
    expect(headerCells.at(0)).toHaveText('Name');
    expect(headerCells.at(1)).toHaveText('Last Modified');
    expect(headerCells.at(2)).toHaveText('Size');
  });

  it('renders a body row for each item', () => {
    const items = [
      {
        node: { name: 'item0', key: 'item0', size: 10, lastModified: new Date('2000-01-01 00:00:00 +0000') },
        matchData: [[{ fragment: 'matchData0', match: false }]],
      },
      {
        node: { name: 'item1', key: 'item1', size: 11, lastModified: new Date('2000-01-01 00:00:01 +0000') },
        matchData: [[{ fragment: 'matchData1', match: false }]],
      },
      {
        node: { name: 'item2', key: 'item2', size: 12, lastModified: new Date('2000-01-01 00:00:02 +0000') },
        matchData: [[{ fragment: 'matchData2', match: false }]],
      },
    ]
    const wrapper = shallow(
      <SearchResultsTable
        items={items}
      />
    );
    const tableRows = wrapper.find('tbody').find('tr');
    expect(tableRows).toHaveLength(3);

    const cells0 = tableRows.at(0).find('td');
    expect(cells0).toHaveLength(3);
    expect(cells0.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells0.at(0).find(NodeLink)).toHaveProp({ node: items[0].node });
    expect(cells0.at(0).find(NodeLink).find(SearchResultTitle)).toHaveLength(1);
    expect(cells0.at(0).find(NodeLink).find(SearchResultTitle)).toHaveProp({ matchData: items[0].matchData });
    expect(cells0.at(1)).toHaveText(new Date('2000-01-01 00:00:00 +0000').toLocaleString());
    expect(cells0.at(2).find(FileSize)).toHaveLength(1);
    expect(cells0.at(2).find(FileSize)).toHaveProp({ size: 10 });

    const cells1 = tableRows.at(1).find('td');
    expect(cells1).toHaveLength(3);
    expect(cells1.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells1.at(0).find(NodeLink)).toHaveProp({ node: items[1].node });
    expect(cells1.at(0).find(NodeLink).find(SearchResultTitle)).toHaveLength(1);
    expect(cells1.at(0).find(NodeLink).find(SearchResultTitle)).toHaveProp({ matchData: items[1].matchData });
    expect(cells1.at(1)).toHaveText(new Date('2000-01-01 00:00:01 +0000').toLocaleString());
    expect(cells1.at(2).find(FileSize)).toHaveLength(1);
    expect(cells1.at(2).find(FileSize)).toHaveProp({ size: 11 });

    const cells2 = tableRows.at(2).find('td');
    expect(cells2).toHaveLength(3);
    expect(cells2.at(0).find(NodeLink)).toHaveLength(1);
    expect(cells2.at(0).find(NodeLink)).toHaveProp({ node: items[2].node });
    expect(cells2.at(0).find(NodeLink).find(SearchResultTitle)).toHaveLength(1);
    expect(cells2.at(0).find(NodeLink).find(SearchResultTitle)).toHaveProp({ matchData: items[2].matchData });
    expect(cells2.at(1)).toHaveText(new Date('2000-01-01 00:00:02 +0000').toLocaleString());
    expect(cells2.at(2).find(FileSize)).toHaveLength(1);
    expect(cells2.at(2).find(FileSize)).toHaveProp({ size: 12 });
  });
});
