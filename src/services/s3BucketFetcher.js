export default function s3BucketFetcher(s3) {
  return new Promise((resolve, reject) => {
    s3.makeUnauthenticatedRequest('listObjectsV2', (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        resolve(data.Contents);
      }
    });
  });
}
