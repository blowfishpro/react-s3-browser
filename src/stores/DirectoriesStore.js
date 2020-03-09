import { action, observable, computed, toJS } from 'mobx';

export default class DirectoriesStore {
  @observable.ref rootObservable = null;
  @observable.ref directoriesObservable = null;
  @observable error = false;

  @action setDirectories({ root, directories }) {
    this.rootObservable = root;
    this.directoriesObservable = directories;
    this.error = false;
  }

  @action onError() {
    this.rootObservable = null;
    this.directoriesObservable = null;
    this.error = true;
  }

  @computed get hasDirectories() {
    return this.directoriesObservable !== null;
  }

  @computed get root() {
    return toJS(this.rootObservable);
  }

  @computed get directories() {
    return toJS(this.directoriesObservable);
  }
}
