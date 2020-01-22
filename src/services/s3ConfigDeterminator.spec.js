import s3ConfigDeterminator from './s3ConfigDeterminator';

describe(s3ConfigDeterminator, () => {
  describe('using s3Config', () => {
    it('uses the bucket name from the s3 config and sets forcePatyStyle to false if not specified', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: { bucketName: 'my-bucket' },
        href: null,
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(urlBase).toEqual('https://my-bucket.s3.amazonaws.com');
    });

    it('uses the bucket name from the s3 config and uses forcePatyStyle if not specified', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: { bucketName: 'my-bucket', forcePathStyle: true },
        href: null,
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(urlBase).toEqual('https://s3.amazonaws.com/my-bucket');
    });

    it('includes a region in the url if specified', () => {
      const { urlBase } = s3ConfigDeterminator({
        s3Config: { bucketName: 'my-bucket', forcePathStyle: false, region: 'us-east-1' },
        href: null,
      });
      expect(urlBase).toEqual('https://my-bucket.s3.us-east-1.amazonaws.com');
    });

    it('includes a region in the url if specified with path style', () => {
      const { urlBase } = s3ConfigDeterminator({
        s3Config: { bucketName: 'my-bucket', forcePathStyle: true, region: 'us-east-1' },
        href: null,
      });
      expect(urlBase).toEqual('https://s3.us-east-1.amazonaws.com/my-bucket');
    });
  });

  describe('using href', () => {
    it('parses the bucket out of the domain name', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: null,
        href: 'https://my-bucket.s3.amazonaws.com/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(urlBase).toEqual('https://my-bucket.s3.amazonaws.com');
    });

    it('parses the bucket out of the domain name with a region specified', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: null,
        href: 'https://my-bucket.s3.us-east-1.amazonaws.com/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeFalsy();
      expect(urlBase).toEqual('https://my-bucket.s3.us-east-1.amazonaws.com');
    });

    it('parses the bucket out of the path', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: null,
        href: 'https://s3.amazonaws.com/my-bucket/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(urlBase).toEqual('https://s3.amazonaws.com/my-bucket');
    });

    it('parses the bucket out of the path with a region specified', () => {
      const { bucketName, forcePathStyle, urlBase } = s3ConfigDeterminator({
        s3Config: null,
        href: 'https://s3.us-east-1.amazonaws.com/my-bucket/some/path',
      });
      expect(bucketName).toEqual('my-bucket');
      expect(forcePathStyle).toBeTruthy();
      expect(urlBase).toEqual('https://s3.us-east-1.amazonaws.com/my-bucket');
    });
  });
});
