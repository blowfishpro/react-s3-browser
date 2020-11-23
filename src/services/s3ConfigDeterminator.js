const s3BucketDomainRegex = /^(?<urlBase>(?<bucketName>[A-Za-z0-9-]+)\.s3(?:\.(?<region>[A-Za-z0-9-]+))?\.amazonaws\.com)$/;
const s3GenericDomainRegex = /^(?<urlBase>s3(?:\.(?<region>[A-Za-z0-9-]+))?\.amazonaws\.com)$/;
const s3WebsiteDomainRegex = /^(?<urlBase>(?<bucketName>[A-Za-z0-9-]+)\.s3-website[.-](?<region>[A-Za-z0-9-]+)\.amazonaws\.com)$/;

export function fromS3Config(s3Config) {
  const { bucketName, region, forcePathStyle = false, basePath = '/' } = s3Config;
  let objectUrlBase = region ? `s3.${region}.amazonaws.com` : 's3.amazonaws.com';
  objectUrlBase = forcePathStyle ? `${objectUrlBase}/${bucketName}` : `${bucketName}.${objectUrlBase}`;
  objectUrlBase = `https://${objectUrlBase}`;
  return { bucketName, forcePathStyle, objectUrlBase, basePath };
}

export function fromHostPath({ hostname, pathname }) {
  const s3BucketDomainMatch = hostname.match(s3BucketDomainRegex);
  if (s3BucketDomainMatch) {
    return ({
      bucketName: s3BucketDomainMatch.groups.bucketName,
      forcePathStyle: false,
      objectUrlBase: `https://${s3BucketDomainMatch.groups.urlBase}`,
      basePath: '/',
    });
  }
  const s3GenericDomainMatch = hostname.match(s3GenericDomainRegex);
  const splitPath = pathname.split('/');
  if (s3GenericDomainMatch && splitPath.length > 1 && splitPath[1] !== '') {
    return ({
      bucketName: splitPath[1],
      forcePathStyle: true,
      objectUrlBase: `https://${s3GenericDomainMatch.groups.urlBase}/${splitPath[1]}`,
      basePath: `/${splitPath[1]}`,
    });
  }
  const s3WebsiteDomainMatch = hostname.match(s3WebsiteDomainRegex);
  if (s3WebsiteDomainMatch) {
    return ({
      bucketName: s3WebsiteDomainMatch.groups.bucketName,
      forcePathStyle: false,
      objectUrlBase: `http://${s3WebsiteDomainMatch.groups.urlBase}`,
      basePath: '/',
    });
  }
  return { bucketName: null, forcePathStyle: false, objectUrlBase: null };
}
