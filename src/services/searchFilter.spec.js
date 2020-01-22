import searchFilter from './searchFilter';

describe(searchFilter, () => {
  it('returns matching leaf nodes', () => {
    const rootNode = {
      children: [
        {
          name: 'dir1',
          children: [
            { name: 'matching', id: 1 },
          ],
        },
        { name: 'thing2' },
        { name: 'MatchinG', id: 2 },
        { name: '123matching456', id: 3 },
      ],
    };

    const expected = [
      { node: { name: 'matching', id: 1 }, matchData: [
        [{ match: false, fragment: 'dir1' }],
        [{ match: true, fragment: 'matching' }],
      ] },
      { node: { name: 'MatchinG', id: 2 }, matchData: [[
        { match: true, fragment: 'MatchinG' },
      ]] },
      { node: { name: '123matching456', id: 3 }, matchData: [[
        { match: false, fragment: '123' },
        { match: true, fragment: 'matching' },
        { match: false, fragment: '456' },
      ]] },
    ];

    expect(searchFilter('matching', rootNode)).toEqual(expected);
  });

  it('returns matching directories and their children', () => {
    const node1 = {
      name: 'dir1',
      children: [
        { name: 'thing1' },
        { name: 'thing2' },
      ],
    };

    const node2 = {
      name: 'MatchinG',
      children: [
        { name: 'thing3' },
        { name: 'thing4' },
        node1,
      ],
    };

    const node3 = {
      name: '123matching456',
      children: [
        { name: 'thing5' },
        { name: 'thing6' },
      ],
    };

    const rootNode = {
      children: [
        { name: 'thing7' },
        { name: 'thing8' },
        {
          name: 'subNode1',
          children: [
            node2,
            { name: 'thing9' },
            { name: 'thing10' },
          ],
        },
        node3,
        {
          name: 'subNode2',
          children: [
            { name: 'thing11' },
            { name: 'thing12' },
          ],
        },
      ],
    };

    const expected = [
      { node: node2, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
      ] },
      { node: { name: 'thing3' }, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
        [{ match: false, fragment: 'thing3' }],
      ] },
      { node: { name: 'thing4' }, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
        [{ match: false, fragment: 'thing4' }],
      ]  },
      { node: node1, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
        [{ match: false, fragment: 'dir1' }],
      ] },
      { node: { name: 'thing1' }, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
        [{ match: false, fragment: 'dir1' }],
        [{ match: false, fragment: 'thing1' }],
      ] },
      { node: { name: 'thing2' }, matchData: [
        [{ match: false, fragment: 'subNode1' }],
        [{ match: true, fragment: 'MatchinG' }],
        [{ match: false, fragment: 'dir1' }],
        [{ match: false, fragment: 'thing2' }],
      ] },
      { node: node3, matchData: [[
        { match: false, fragment: '123' },
        { match: true, fragment: 'matching' },
        { match: false, fragment: '456'},
      ]] },
      { node: { name: 'thing5' }, matchData: [
        [
          { match: false, fragment: '123' },
          { match: true, fragment: 'matching' },
          { match: false, fragment: '456'},
        ],
        [{ match: false, fragment: 'thing5' }],
      ] },
      { node: { name: 'thing6' }, matchData: [
        [
          { match: false, fragment: '123' },
          { match: true, fragment: 'matching' },
          { match: false, fragment: '456'},
        ],
        [{ match: false, fragment: 'thing6' }],
      ] },
    ];

    expect(searchFilter('matching', rootNode)).toEqual(expected);
  });

  it('does not double match items that match twice', () => {
    const node = {
      name: 'matching',
      children: [
        { name: 'matchingStuff' },
      ],
    };

    const rootNode = {
      children: [
        node,
      ],
    };

    const expected = [
      { node: node, matchData: [
        [{ match: true, fragment: 'matching' }],
      ] },
      { node: { name: 'matchingStuff' }, matchData: [
        [{ match: true, fragment: 'matching' }],
        [{ match: false, fragment: 'matchingStuff' }],
      ] },
    ]

    expect(searchFilter('matching', rootNode)).toEqual(expected);
  });

  it('returns directories with a trailing slash', () => {
    const node = {
      name: 'matching',
      children: [
        { name: 'thing1' },
      ],
    };

    const rootNode = {
      children: [
        node,
        { name: 'matching' },
      ],
    };

    const expected = [
      { node: node, matchData: [
        [{ match: true, fragment: 'matching' }],
      ] },
      { node: { name: 'thing1' }, matchData: [
        [{ match: true, fragment: 'matching' }],
        [{ match: false, fragment: 'thing1' }],
      ] },
    ]

    expect(searchFilter('matching/', rootNode)).toEqual(expected);
  });

  it('matches multiple parts', () => {
    const node1 = {
      name: 'jklmnopqr',
    };

    const node2 = {
      name: 'yyy',
    };

    const node3 = {
      name: 'jklmnopqr',
      children: [
        node2,
      ],
    }

    const rootNode = {
      children: [
        {
          name: 'abcdefghi',
          children: [
            node1,
            {
              name: 'xxx',
              children: [
                node3
              ]
            },
            { name: 'zzz' },
          ]
        },
      ],
    }

    const expected = [
      { node: node1, matchData: [
        [
          { match: false, fragment: 'abc'},
          { match: true, fragment: 'def'},
          { match: false, fragment: 'ghi'},
        ],
        [
          { match: false, fragment: 'jkl' },
          { match: true, fragment: 'mno' },
          { match: false, fragment: 'pqr' },
        ],
      ]},
      { node: node3, matchData: [
        [
          { match: false, fragment: 'abc'},
          { match: true, fragment: 'def'},
          { match: false, fragment: 'ghi'},
        ],
        [{ match: false, fragment: 'xxx' }],
        [
          { match: false, fragment: 'jkl' },
          { match: true, fragment: 'mno' },
          { match: false, fragment: 'pqr' },
        ],
      ]},
      { node: node2, matchData: [
        [
          { match: false, fragment: 'abc'},
          { match: true, fragment: 'def'},
          { match: false, fragment: 'ghi'},
        ],
        [{ match: false, fragment: 'xxx' }],
        [
          { match: false, fragment: 'jkl' },
          { match: true, fragment: 'mno' },
          { match: false, fragment: 'pqr' },
        ],
        [{ match: false, fragment: 'yyy' }],
      ]},
    ];

    expect(searchFilter('def/mno', rootNode)).toEqual(expected);
  });
});
