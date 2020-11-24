import AppStore from './AppStore';

describe(AppStore, () => {
  it('initializes in the loading state', () => {
    const appStore = new AppStore();
    expect(appStore.isLoading).toBe(true);
    expect(appStore.isError).toBe(false);
    expect(appStore.isLoaded).toBe(false);
  });

  it('records when an error happens', () => {
    const appStore = new AppStore();
    appStore.onError('an error');
    expect(appStore.isLoading).toBe(false);
    expect(appStore.isError).toBe(true);
    expect(appStore.isLoaded).toBe(false);
    expect(appStore.error).toEqual('an error');
  });

  it('loads', () => {
    const appStore = new AppStore();
    appStore.onLoaded({ root: 'root', directories: ['one', 'two'] });
    expect(appStore.isLoading).toBe(false);
    expect(appStore.isError).toBe(false);
    expect(appStore.isLoaded).toBe(true);
    expect(appStore.root).toEqual('root');
    expect(appStore.directories).toEqual(['one', 'two']);
  });
});
