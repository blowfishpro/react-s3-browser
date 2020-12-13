import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import AWS from 'aws-sdk';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import * as s3ConfigDeterminator from './services/s3ConfigDeterminator';
import S3DirectoryListBuilder from './services/S3DirectoryListBuilder';
import AppStore from './stores/AppStore';
import SortStore from './stores/SortStore';
import SortClassDeterminator from './services/SortClassDeterminator';
import searchFilter from './services/searchFilter';
import sortItems from './services/sortItems';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const sortStore = new SortStore('name', 'asc');
const appStore = new AppStore();
const sortClassDeterminator = SortClassDeterminator(
  ['name', 'lastModified', 'size'],
  'sort-none',
  'sort-asc',
  'sort-desc'
);

async function loadData() {
  try {
    let bucketName, objectUrlBase, basePath, contents;

    if (window.s3Config) {
      let forcePathStyle;
      ({ bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromS3Config(window.s3Config));
        const s3 = new AWS.S3({ params: { Bucket: bucketName }, s3ForcePathStyle: forcePathStyle });
        const data = await s3.makeUnauthenticatedRequest('listObjectsV2').promise();
        contents = data.Contents;
    } else if (process.env.NODE_ENV !== 'production') {
      const splitPath = window.location.pathname.split('/');
      if (splitPath.length > 2 && splitPath[1] === 'generic') {
        bucketName = splitPath[2];
        objectUrlBase = `https://${bucketName}.s3.amazonaws.com`;
        basePath = `/generic/${bucketName}`;
        const s3 = new AWS.S3({ params: { Bucket: bucketName } });
        const data = await s3.makeUnauthenticatedRequest('listObjectsV2').promise();
        contents = data.Contents;
      } else {
        console.log('using fake s3 data');
        bucketName = 'example-bucket';
        objectUrlBase = `https://${bucketName}.s3.amazonaws.com`;
        basePath = '/';
        const data = [
          { Key: 'foo1.file', Size: 1, LastModified: new Date('2000-01-01 00:00:00 +0000') },
          { Key: 'foo2/bar1.file', Size: 2, LastModified: new Date('2000-01-01 00:00:01 +0000') },
          { Key: 'foo2/bar2/baz1.file', Size: 3, LastModified: new Date('2000-01-01 00:00:02 +0000') },
          { Key: 'foo2/bar2/baz2.file', Size: 4, LastModified: new Date('2000-01-01 00:00:00 +0000') },
          { Key: 'foo2/bar3/baz3.file', Size: 5, LastModified: new Date('2000-01-01 00:00:01 +0000') },
        ];
        contents = await new Promise((resolve, reject) => setTimeout(() => resolve(data), 500));
      }
    } else {
      let forcePathStyle;
      ({ bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({ hostname: window.location.hostname, pathname: window.location.pathname }));

      const s3 = new AWS.S3({ params: { Bucket: bucketName }, s3ForcePathStyle: forcePathStyle });
      const data = await s3.makeUnauthenticatedRequest('listObjectsV2').promise();
      contents = data.Contents;
    }

    const treeBuilder = S3DirectoryListBuilder(bucketName, objectUrlBase);

    const { root, directories } = treeBuilder(contents);

    appStore.onLoaded({ root, directories, basePath });
  } catch (error) {
    console.error(error);
    if (error instanceof s3ConfigDeterminator.CannotDetermineBucket) {
      appStore.onError(error.message);
    } else {
      appStore.onError('Error loading data');
    }
  }
}

loadData();

ReactDOM.render(
  <App
    sortStore={sortStore}
    appStore={appStore}
    sortClassDeterminator={sortClassDeterminator}
    searchFilter={searchFilter}
    sortItems={sortItems}
  />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
