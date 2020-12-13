import { action, observable, computed, toJS, makeObservable } from 'mobx';

export default class DirectoriesStore {
  @observable.ref rootObservable = null;
  @observable.ref directoriesObservable = null;
  @observable basePath = null;
  @observable error = null;

  constructor() {
    makeObservable(this);
  }

  @action onLoaded({ root, directories, basePath }) {
    this.rootObservable = root;
    this.directoriesObservable = directories;
    this.basePath = basePath;
    this.error = null;
  }

  @action onError(error) {
    this.rootObservable = null;
    this.directoriesObservable = null;
    this.error = error;
  }

  @computed get isLoading() {
    return this.error === null && this.directoriesObservable === null;
  }

  @computed get isLoaded() {
    return this.directoriesObservable !== null;
  }

  @computed get isError() {
    return this.error !== null;
  }

  @computed get root() {
    return toJS(this.rootObservable);
  }

  @computed get directories() {
    return toJS(this.directoriesObservable);
  }
}
