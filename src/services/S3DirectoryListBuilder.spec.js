import S3DirectoryListBuilder from './S3DirectoryListBuilder';

describe(S3DirectoryListBuilder, () => {
  it('builds ', () => {
    const data = [
      { Key: 'foo1.file', Size: 1, LastModified: new Date('2000-01-01 00:00:00 +0000') },
      { Key: 'foo2/bar1.file', Size: 2, LastModified: new Date('2000-01-01 00:00:01 +0000') },
      { Key: 'foo2/bar2/baz1.file', Size: 3, LastModified: new Date('2000-01-01 00:00:02 +0000') },
      { Key: 'foo2/bar2/baz2.file', Size: 4, LastModified: new Date('2000-01-01 00:00:00 +0000') },
      { Key: 'foo2/bar3/baz3.file', Size: 5, LastModified: new Date('2000-01-01 00:00:01 +0000') },
    ];

    const root = {
      name: 'bucket-name',
      path: '/',
      key: '',
      parent: null,
      children: [],
    };

    const foo1Node = {
      name: 'foo1.file',
      url: 'https://bucket-name.s3.amazonaws.com/foo1.file',
      path: '/foo1.file',
      key: 'foo1.file',
      lastModified: new Date('2000-01-01 00:00:00 +0000'),
      size: 1,
    };
    root.children.push(foo1Node);

    const foo2Node = {
      name: 'foo2',
      path: '/foo2',
      key: 'foo2',
      parent: root,
      children: [],
      lastModified: new Date('2000-01-01 00:00:02 +0000'),
      size: 14,
    };
    root.children.push(foo2Node);

    const bar1Node = {
      name: 'bar1.file',
      url: 'https://bucket-name.s3.amazonaws.com/foo2/bar1.file',
      path: '/foo2/bar1.file',
      key: 'foo2/bar1.file',
      lastModified: new Date('2000-01-01 00:00:01 +0000'),
      size: 2,
    };
    foo2Node.children.push(bar1Node);

    const bar2Node = {
      name: 'bar2',
      path: '/foo2/bar2',
      key: 'foo2/bar2',
      parent: foo2Node,
      children: [],
      lastModified: new Date('2000-01-01 00:00:02 +0000'),
      size: 7,
    };
    foo2Node.children.push(bar2Node);

    const bar3Node = {
      name: 'bar3',
      path: '/foo2/bar3',
      key: 'foo2/bar3',
      parent: foo2Node,
      children: [],
      lastModified: new Date('2000-01-01 00:00:01 +0000'),
      size: 5,
    };
    foo2Node.children.push(bar3Node);

    const baz1Node = {
      name: 'baz1.file',
      url: 'https://bucket-name.s3.amazonaws.com/foo2/bar2/baz1.file',
      path: '/foo2/bar2/baz1.file',
      key: 'foo2/bar2/baz1.file',
      lastModified: new Date('2000-01-01 00:00:02 +0000'),
      size: 3,
    };
    bar2Node.children.push(baz1Node);

    const baz2Node = {
      name: 'baz2.file',
      url: 'https://bucket-name.s3.amazonaws.com/foo2/bar2/baz2.file',
      path: '/foo2/bar2/baz2.file',
      key: 'foo2/bar2/baz2.file',
      lastModified: new Date('2000-01-01 00:00:00 +0000'),
      size: 4,
    };
    bar2Node.children.push(baz2Node);

    const baz3Node = {
      name: 'baz3.file',
      url: 'https://bucket-name.s3.amazonaws.com/foo2/bar3/baz3.file',
      path: '/foo2/bar3/baz3.file',
      key: 'foo2/bar3/baz3.file',
      lastModified: new Date('2000-01-01 00:00:01 +0000'),
      size: 5,
    };
    bar3Node.children.push(baz3Node);

    const expected = {
      root,
      directories: [
        root,
        foo2Node,
        bar2Node,
        bar3Node,
      ],
    };

    expect(S3DirectoryListBuilder('bucket-name', 'https://bucket-name.s3.amazonaws.com')(data)).toEqual(expected);
  });
});
