export default function sortItems(items, by, order) {
  return items.sort(function(a, b) {
    const valA = a[by];
    const valB = b[by];

    let type;

    if (typeof(valA.toDateString) === 'function' && typeof(valA.toDateString) === 'function') {
      type = 'date'
    } else if (typeof(valA) === typeof(valB)) {
      type = typeof(valA);
    } else {
      type = 'object';
    }

    let result;

    switch(type) {
      case 'number':
      case 'date':
        result = Math.sign(valA - valB);
        break;
      default:
        result = valA.toString().localeCompare(valB.toString());
    }

    if (order === 'desc') {
      result = -result;
    }
    return result;
  });
}
