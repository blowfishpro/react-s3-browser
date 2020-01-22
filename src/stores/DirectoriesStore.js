import { action, observable, computed, toJS } from 'mobx';

export default class DirectoriesStore {
  @observable.ref directoriesObservable = null;
  @observable error = false;

  @action setDirectories(directories) {
    this.directoriesObservable = directories;
    this.error = false;
  }

  @action onError() {
    this.directoriesObservable = null;
    this.error = true;
  }

  @computed get hasDirectories() {
    return this.directoriesObservable !== null;
  }

  @computed get directories() {
    return toJS(this.directoriesObservable);
  }
}
