import SortStore from './SortStore';

describe(SortStore, () => {
  describe('constructor', () => {
    it('initializes with the specified sort by and descending order', () => {
      const sortStore = new SortStore('someAttribute', 'desc');
      expect(sortStore.sortBy).toEqual('someAttribute');
      expect(sortStore.sortOrder).toEqual('desc');
    });
  });

  describe('changeSort', () => {
    it('changes from asending to descending when changing the current column', () => {
      const sortStore = new SortStore('someAttribute', 'asc');
      sortStore.changeSort('someAttribute');
      expect(sortStore.sortBy).toEqual('someAttribute');
      expect(sortStore.sortOrder).toEqual('desc');
    });

    it('changes from descending to ascending when changing the current column', () => {
      const sortStore = new SortStore('someAttribute', 'desc');
      sortStore.changeSort('someAttribute');
      expect(sortStore.sortBy).toEqual('someAttribute');
      expect(sortStore.sortOrder).toEqual('asc');
    });

    it('sets default sort order of asc when sorting by a new column and sort by is asc', () => {
      const sortStore = new SortStore('someAttribute', 'asc');
      sortStore.changeSort('someOtherAttribute');
      expect(sortStore.sortBy).toEqual('someOtherAttribute');
      expect(sortStore.sortOrder).toEqual('asc');
    });

    it('sets default sort order of asc when sorting by a new column and sort by is desc', () => {
      const sortStore = new SortStore('someAttribute', 'asc');
      sortStore.changeSort('someAttribute');
      expect(sortStore.sortOrder).toEqual('desc');
      sortStore.changeSort('someOtherAttribute');
      expect(sortStore.sortBy).toEqual('someOtherAttribute');
      expect(sortStore.sortOrder).toEqual('asc');
    });

    it('sets default sort order of desc when sorting by a new column and sort by is desc', () => {
      const sortStore = new SortStore('someAttribute', 'desc');
      sortStore.changeSort('someOtherAttribute');
      expect(sortStore.sortBy).toEqual('someOtherAttribute');
      expect(sortStore.sortOrder).toEqual('desc');
    });

    it('sets default sort order of desc when sorting by a new column and sort by is asc', () => {
      const sortStore = new SortStore('someAttribute', 'desc');
      sortStore.changeSort('someAttribute');
      expect(sortStore.sortOrder).toEqual('asc');
      sortStore.changeSort('someOtherAttribute');
      expect(sortStore.sortBy).toEqual('someOtherAttribute');
      expect(sortStore.sortOrder).toEqual('desc');
    });
  });
});
