const s3DomainRegex = /^(?<urlBase>https?:\/\/(?<bucketName>[A-Za-z0-9-]+)\.s3(?:\.(?<region>[A-Za-z0-9-]+))?\.amazonaws\.com)/;
const s3PathRegex = /^(?<urlBase>https?:\/\/s3(?:\.(?<region>[A-Za-z0-9-]+))?\.amazonaws\.com\/(?<bucketName>[A-Za-z0-9-]+))/;
const s3WebsiteRegex = /^(?<urlBase>https?:\/\/(?<bucketName>[A-Za-z0-9-]+)\.s3-website[.-](?<region>[A-Za-z0-9-]+)\.amazonaws\.com)/;

export default function s3ConfigDeterminator({ s3Config, href }) {
  if (s3Config && s3Config.bucketName) {
    const { bucketName, region } = s3Config;
    const forcePathStyle = s3Config.forcePathStyle || false;
    let urlBase = region ? `s3.${region}.amazonaws.com` : 's3.amazonaws.com';
    urlBase = forcePathStyle ? `${urlBase}/${bucketName}` : `${bucketName}.${urlBase}`;
    urlBase = `https://${urlBase}`;
    return { bucketName, forcePathStyle, urlBase };
  }
  const domainMatch = href.match(s3DomainRegex);
  if (domainMatch) {
    return { bucketName: domainMatch.groups.bucketName, forcePathStyle: false, urlBase: domainMatch.groups.urlBase };
  }
  const pathMatch = href.match(s3PathRegex);
  if (pathMatch) {
    return { bucketName: pathMatch.groups.bucketName, forcePathStyle: true, urlBase: pathMatch.groups.urlBase };
  }
  const websiteMatch = href.match(s3WebsiteRegex);
  if (websiteMatch) {
    return { bucketName: websiteMatch.groups.bucketName, forcePathStyle: false, urlBase: websiteMatch.groups.urlBase };
  }
  return { bucketName: null, forcePathStyle: false, urlBase: null };
}
