import AppStore from './AppStore';

describe(AppStore, () => {
  it('initializes in the loading state', () => {
    const appStore = new AppStore();
    expect(appStore.hasDirectories).toBe(false);
    expect(appStore.root).toBeNull();
    expect(appStore.directories).toBeNull();
    expect(appStore.error).toBe(false);
  });

  it('records when an error happens', () => {
    const appStore = new AppStore();
    appStore.onError();
    expect(appStore.hasDirectories).toBe(false);
    expect(appStore.root).toBeNull();
    expect(appStore.directories).toBeNull();
    expect(appStore.error).toBe(true);
  });

  it('records when an error happens', () => {
    const appStore = new AppStore();
    appStore.setDirectories({ root: 'root', directories: ['one', 'two'] });
    expect(appStore.hasDirectories).toBe(true);
    expect(appStore.root).toEqual('root');
    expect(appStore.directories).toEqual(['one', 'two']);
    expect(appStore.error).toBe(false);
  });
});
