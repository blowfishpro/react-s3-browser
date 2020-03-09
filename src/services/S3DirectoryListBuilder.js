export default function S3DirectoryListBuilder(rootName, baseUrl) {
  return function(data) {
    const root = {
      name: rootName,
      path: '/',
      key: '',
      parent: null,
      children: []
    };

    const directories = [root];

    data.forEach(item => {
      const parts = item['Key'].split('/');
      const leafName = parts.pop();
      var currentNode = root;
      parts.forEach(part => {
        var newCurrentNode = currentNode.children.find(child => child.name === part);
        if (newCurrentNode === undefined) {
          const key = (root === currentNode) ? part : `${currentNode.key}/${part}`;
          newCurrentNode = {
            name: part,
            path: '/' + key,
            key: key,
            parent: currentNode,
            children: [],
            lastModified: item['LastModified'],
            size: 0,
          };
          currentNode.children.push(newCurrentNode);
          directories.push(newCurrentNode);
        } else if (newCurrentNode.lastModified < item['LastModified']) {
          newCurrentNode.lastModified = item['LastModified'];
        }
        newCurrentNode.size += item['Size'];
        currentNode = newCurrentNode;
      });

      currentNode.children.push({
        name: leafName,
        url: `${baseUrl}/${item['Key']}`,
        path: '/' + item['Key'],
        key: item['Key'],
        lastModified: item['LastModified'],
        size: item['Size']
      });
    });

    return { root, directories };
  };
}
