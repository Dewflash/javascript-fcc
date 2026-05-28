function steamrollArray(arr) {
  let flattened = [];

  // Helper function to handle recursion
  function flatten(item) {
    if (!Array.isArray(item)) {
      // If it's not an array, push it to our result
      flattened.push(item);
    } else {
      // If it IS an array, loop through and recurse
      for (let i = 0; i < item.length; i++) {
        flatten(item[i]);
      }
    }
  }

  // Start the process
  flatten(arr);
  return flattened;
}
