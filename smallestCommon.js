/*
To find the Least Common Multiple (LCM) for a range, you need to calculate the LCM of two numbers repeatedly across the entire sequence.

### The Core Logic

1. **Find the Range:** Sort the input array (e.g., `[5, 1]` becomes `[1, 5]`) and create a full list of all integers between those two numbers.
2. **GCD (Greatest Common Divisor):** Use the **Euclidean Algorithm** to find the GCD of two numbers.
3. **LCM Formula:** Use the formula: $\text{LCM}(a, b) = \frac{|a \times b|}{\text{GCD}(a, b)}$.
4. **Reduce:** Apply this calculation across your entire range.

*/

// The Solution


function smallestCommons(arr) {
  // 1. Sort the range
  const [min, max] = arr.sort((a, b) => a - b);
  const range = [];
  for (let i = min; i <= max; i++) range.push(i);

  // 2. GCD helper function (Euclidean algorithm)
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  // 3. LCM helper function
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

  // 4. Reduce the range to a single LCM
  return range.reduce((multiple, current) => lcm(multiple, current));
}

// Example usage:
console.log(smallestCommons([1, 5])); // 60


/*

### Why this is the standard approach:

* **Euclidean Algorithm (`gcd`)**: This is the most efficient way to find the greatest common divisor. It recursively takes the remainder of `a` divided by `b` until the remainder is `0`.
* **`.reduce()`**: Since you are combining a list of numbers into a single result (the common multiple), `reduce` is the perfect tool for the job. It takes the LCM of the first two, then takes *that* result and finds the LCM with the third, and so on.
* **Input Flexibility**: By sorting the array at the start (`[min, max]`), the function handles `[1, 5]` and `[5, 1]` identically.

*/