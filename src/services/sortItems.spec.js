import sortItems from './sortItems';

describe(sortItems, () => {
  it('sorts by a string', () => {
    const item1 = { name: 'item1', someAttribute: 'aaa' };
    const item2 = { name: 'item2', someAttribute: 'bbb' };
    const item3 = { name: 'item3', someAttribute: 'ccc'};

    expect(sortItems([item2, item3, item1], 'someAttribute', 'asc')).toEqual([item1, item2, item3]);
  });

  it('sorts by a number', () => {
    const item1 = { name: 'item1', someAttribute: -1 };
    const item2 = { name: 'item2', someAttribute: 0 };
    const item3 = { name: 'item3', someAttribute: 1 };

    expect(sortItems([item2, item3, item1], 'someAttribute', 'asc')).toEqual([item1, item2, item3]);
  });

  it('sorts by a date', () => {
    const item1 = { name: 'item1', someAttribute: new Date('2000-01-01') };
    const item2 = { name: 'item2', someAttribute: new Date('2000-01-02') };
    const item3 = { name: 'item3', someAttribute: new Date('2000-01-03') };

    expect(sortItems([item2, item3, item1], 'someAttribute', 'asc')).toEqual([item1, item2, item3]);
  });

  it('sorts in descending order', () => {
    const item1 = { name: 'item1', someAttribute: -1 };
    const item2 = { name: 'item2', someAttribute: 0 };
    const item3 = { name: 'item3', someAttribute: 1 };

    expect(sortItems([item2, item3, item1], 'someAttribute', 'desc')).toEqual([item3, item2, item1]);
  })
});
