export default function SortClassDeterminator(columns, sortNoneClass, sortAscClass, sortDescClass) {
  return function(sortBy, sortOrder) {
    var sortClass;
    switch(sortOrder) {
      case 'desc':
        sortClass = sortDescClass;
        break;
      case 'asc':
        sortClass = sortAscClass;
        break;
      default:
        throw new Error(`Invalid sort order:${sortOrder}`);
    };

    const result = {};

    columns.forEach(col => result[col] = (col === sortBy) ? sortClass : sortNoneClass);

    return result;
  };
}
