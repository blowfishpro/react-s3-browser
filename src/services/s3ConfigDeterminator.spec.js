import * as s3ConfigDeterminator from './s3ConfigDeterminator';

describe('s3ConfigDeterminator', () => {
  describe(s3ConfigDeterminator.fromS3Config, () => {
    it('uses the bucket name from the s3 config and sets forcePatyStyle to false if not specified', () => {
      const { bucketName, forcePathStyle, objectUrlBase } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(objectUrlBase).toEqual('https://my-bucket.s3.amazonaws.com');
    });

    it('uses the bucket name from the s3 config and uses forcePatyStyle if not specified', () => {
      const { bucketName, forcePathStyle, objectUrlBase } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
        forcePathStyle: true,
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(objectUrlBase).toEqual('https://s3.amazonaws.com/my-bucket');
    });

    it('includes a region in the url if specified', () => {
      const { objectUrlBase } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
        forcePathStyle: false,
        region: 'us-east-1',
      });
      expect(objectUrlBase).toEqual('https://my-bucket.s3.us-east-1.amazonaws.com');
    });

    it('includes a region in the url if specified with path style', () => {
      const { objectUrlBase } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
        forcePathStyle: true,
        region: 'us-east-1',
      });
      expect(objectUrlBase).toEqual('https://s3.us-east-1.amazonaws.com/my-bucket');
    });

    it('uses a default base path of / if none is passed in', () => {
      const { basePath } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
      });

      expect(basePath).toEqual('/');
    });

    it('passes through a base path if specified', () => {
      const { basePath } = s3ConfigDeterminator.fromS3Config({
        bucketName: 'my-bucket',
        basePath: '/base/path',
      });

      expect(basePath).toEqual('/base/path');
    });
  });

  describe(s3ConfigDeterminator.fromHostPath, () => {
    it('parses the bucket out of the domain name', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 'my-bucket.s3.amazonaws.com',
        pathname: '/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(objectUrlBase).toEqual('https://my-bucket.s3.amazonaws.com');
      expect(basePath).toEqual('/');
    });

    it('parses the bucket out of the domain name with a region specified', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 'my-bucket.s3.us-east-1.amazonaws.com',
        pathname: '/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(objectUrlBase).toEqual('https://my-bucket.s3.us-east-1.amazonaws.com');
      expect(basePath).toEqual('/');
    });

    it('parses the bucket out of the domain name in an s3 website url', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 'my-bucket.s3-website.us-east-1.amazonaws.com',
        pathname: '/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(objectUrlBase).toEqual('http://my-bucket.s3-website.us-east-1.amazonaws.com');
      expect(basePath).toEqual('/');
    });

    it('parses the bucket out of the domain name in an s3 website url using a hyphen before the region', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 'my-bucket.s3-website-us-east-1.amazonaws.com',
        pathname: '/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(objectUrlBase).toEqual('http://my-bucket.s3-website-us-east-1.amazonaws.com');
      expect(basePath).toEqual('/');
    });

    it('parses the bucket out of the path', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 's3.amazonaws.com',
        pathname: '/my-bucket/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(objectUrlBase).toEqual('https://s3.amazonaws.com/my-bucket');
      expect(basePath).toEqual('/my-bucket');
    });

    it('parses the bucket out of the path with a region specified', () => {
      const { bucketName, forcePathStyle, objectUrlBase, basePath } = s3ConfigDeterminator.fromHostPath({
        hostname: 's3.us-east-1.amazonaws.com',
        pathname: '/my-bucket/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(objectUrlBase).toEqual('https://s3.us-east-1.amazonaws.com/my-bucket');
      expect(basePath).toEqual('/my-bucket');
    });

    it('does not parse the bucket out of an empty path with a generic s3 domain', () => {
      const { bucketName, objectUrlBase } = s3ConfigDeterminator.fromHostPath({
        hostname: 's3.amazonaws.com',
        pathname: '/',
      });
      expect(bucketName).toBeNull();
      expect(objectUrlBase).toBeNull();
    });
  });
});
