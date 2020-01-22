import SortClassDeterminator from './SortClassDeterminator';

describe(SortClassDeterminator, () => {
  it('uses the ascending sort class for a column sorted ascending', () => {
    const columns = ['col1', 'col2', 'col3', 'col4'];
    const expected = { col1: 'sort-none', col2: 'sort-asc', col3: 'sort-none', col4: 'sort-none'};
    const sortClassDeterminator = SortClassDeterminator(columns, 'sort-none', 'sort-asc', 'sort-desc');
    expect(sortClassDeterminator('col2', 'asc')).toEqual(expected);
  });

  it('uses the descending sort class for a column sorted descending', () => {
    const columns = ['col1', 'col2', 'col3', 'col4'];
    const expected = { col1: 'sort-none', col2: 'sort-none', col3: 'sort-desc', col4: 'sort-none'};
    const sortClassDeterminator = SortClassDeterminator(columns, 'sort-none', 'sort-asc', 'sort-desc');
    expect(sortClassDeterminator('col3', 'desc')).toEqual(expected);
  });
});
