import { action, observable, makeObservable } from 'mobx';

export default class SortStore {
  @observable sortBy = null;
  @observable sortOrder = 'desc';

  constructor(defaultSortBy, defaultSortOrder) {
    makeObservable(this);
    this.sortBy = defaultSortBy;
    this.defaultSortOrder = defaultSortOrder;
    this.sortOrder = defaultSortOrder;
  }

  @action changeSort(sortBy) {
    if (this.sortBy === sortBy) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortOrder = this.defaultSortOrder;
    }
    this.sortBy = sortBy;
  }
}
