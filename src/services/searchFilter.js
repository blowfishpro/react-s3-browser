export default function searchFilter(searchTerm, node) {
  const searchTermParts = searchTerm.toLowerCase().split('/');
  return searchFilterInternal(searchTermParts, node.children, []);
}

function searchFilterInternal(searchTermParts, nodes, matchData) {
  const results = [];

  nodes.forEach(node => {
    const name = node.name.toLowerCase();

    let newMatchData;
    if (name.includes(searchTermParts[0])) {
      newMatchData = [];
      const startIndex = name.indexOf(searchTermParts[0]);
      if (startIndex > 0)
        newMatchData.push({ match: false, fragment: node.name.slice(0, startIndex) });
      const endIndex = startIndex + searchTermParts[0].length;
      if (endIndex > startIndex)
        newMatchData.push({ match: true, fragment: node.name.slice(startIndex, endIndex) });
      if (endIndex < name.length)
        newMatchData.push({ match: false, fragment: node.name.slice(endIndex) });
    } else {
      newMatchData = [
        { match: false, fragment: node.name },
      ];
    }

    if (
      (searchTermParts.length === 1 && name.includes(searchTermParts[0]))
      || (
        node.children && searchTermParts.length === 2
        && searchTermParts[1] === ''
        && name.includes(searchTermParts[0])
      )
      || searchTermParts.length === 0
    ) {
      results.push({ node: node, matchData: matchData.concat([newMatchData]) });
    }

    if (node.children) {
      if (searchTermParts.length > 0 && name.includes(searchTermParts[0])) {
        results.push(...searchFilterInternal(searchTermParts.slice(1), node.children, matchData.concat([newMatchData])));
      } else {
        results.push(...searchFilterInternal(searchTermParts, node.children, matchData.concat([newMatchData])));
      }

    }
  });

  return results;
}
