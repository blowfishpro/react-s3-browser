import React from 'react';
import ReactDOM from 'react-dom';
import AWS from 'aws-sdk';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import s3ConfigDeterminator from './services/s3ConfigDeterminator';
import s3BucketFetcher from './services/s3BucketFetcher';
import S3DirectoryListBuilder from './services/S3DirectoryListBuilder';
import DirectoriesStore from './stores/DirectoriesStore';
import SortStore from './stores/SortStore';
import SortClassDeterminator from './services/SortClassDeterminator';
import searchFilter from './services/searchFilter';
import sortItems from './services/sortItems';

let { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({ s3Config: window.s3Config, href: window.location.href });

let bucketFetcher;

if (bucketName) {
  const s3 = new AWS.S3({ params: { Bucket: bucketName }, s3ForcePathStyle: forcePathStyle });
  bucketFetcher = s3BucketFetcher(s3);
} else if (process.env.NODE_ENV !== 'production') {
  console.log('using fake s3 data');
  bucketName = 'example-bucket';
  urlBase = `https://${bucketName}.s3.amazonaws.com`;
  const data = [
    { Key: 'foo1.file', Size: 1, LastModified: new Date('2000-01-01 00:00:00 +0000') },
    { Key: 'foo2/bar1.file', Size: 2, LastModified: new Date('2000-01-01 00:00:01 +0000') },
    { Key: 'foo2/bar2/baz1.file', Size: 3, LastModified: new Date('2000-01-01 00:00:02 +0000') },
    { Key: 'foo2/bar2/baz2.file', Size: 4, LastModified: new Date('2000-01-01 00:00:00 +0000') },
    { Key: 'foo2/bar3/baz3.file', Size: 5, LastModified: new Date('2000-01-01 00:00:01 +0000') },
  ];
  bucketFetcher = new Promise((resolve, reject) => setTimeout(() => resolve(data), 500));
} else {
  throw new Error('Unable to determine s3 bucket');
}

const treeBuilder = S3DirectoryListBuilder(bucketName, urlBase);

const sortStore = new SortStore('name', 'asc');
const directoriesStore = new DirectoriesStore();

bucketFetcher
  .then(data => treeBuilder(data))
  .then(directories => {
    directoriesStore.setDirectories(directories);
  })
  .catch((err) => {
    console.log(err);
    directoriesStore.onError();
  });

const sortClassDeterminator = SortClassDeterminator(
  ['name', 'lastModified', 'size'],
  'sort-none',
  'sort-asc',
  'sort-desc'
);

ReactDOM.render(
  <App
    sortStore={sortStore}
    directoriesStore={directoriesStore}
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
