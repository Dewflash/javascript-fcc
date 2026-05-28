/*To solve this, we need two components: a way to check if a specific number is prime, and a loop to sum all those primes up to your target number.

### The Solution

*/

function sumPrimes(num) {
  // 1. Helper function to check if a number is prime
  function isPrime(n) {
    if (n < 2) return false;
    // Check if divisible by any number up to its square root
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  // 2. Loop through all numbers up to 'num' and sum the primes
  let sum = 0;
  for (let i = 2; i <= num; i++) {
    if (isPrime(i)) {
      sum += i;
    }
  }
  return sum;
}

/*

### Why this works:

1. **`isPrime(n)`**: This is a classic "gatekeeper" function. A number is prime if it isn't divisible by anything other than 1 and itself. We only need to check up to the **square root of `n**` because if a number has a factor larger than its square root, it must also have a corresponding factor smaller than it.
2. **`Math.sqrt(n)`**: This makes your function significantly faster than checking every number up to `n`.
3. **The Loop**: We start at `2` (the first prime) and go up to `num`. If `isPrime(i)` returns `true`, we add that number to our running total (`sum`).

### Summary for your notes:

* **Prime Check**: Always use the square root trick (`Math.sqrt`) to keep your prime checker efficient.
* **Summation Logic**: Use a simple accumulator (`sum`) and a loop to iterate through the range.

*/