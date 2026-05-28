**Higher-Order Functions (HOFs)**

A function that either **takes a function as an argument** or **returns a function**. The built-in array methods are the most common ones:

---

**`.map(fn)`** — transforms every item, returns new array
```js
str.split("|").map(s => s.trim())
// takes each piece, runs trim() on it, returns cleaned array
```

**`.find(fn)`** — returns the first item where the function returns true
```js
pantry.find(p => p.sku === item.sku)
// p is each pantry item, checks if its sku matches
```

**`.reduce(fn, startValue)`** — accumulates into a single value (here an object)
```js
actions.reduce((acc, action) => {
  acc[zone].push(action);
  return acc;
}, {})
// acc = accumulator (starts as {}), builds up the grouped object
```

---

**Other techniques in your code:**

**Arrow functions** `=>`
```js
s => s.trim()       // one param, no brackets needed
p => p.sku === item.sku  // implicit return when one expression
```

**Destructuring from split**
```js
const [sku, name, qty, expires, zone] = str.split("|")
// splits "SKU01|Beans|5|2027|dry" into 5 variables at once
```

**Spread to shallow clone**
```js
pantry.map(item => ({ ...item }))
// copies each object's properties into a new object
// the () around {} is needed so JS doesn't confuse {} with a code block
```

**Set for deduplication**
```js
const seenSkus = new Set();
if (seenSkus.has(sku)) continue; // skip if already seen
seenSkus.add(sku);               // mark as seen
// Set only stores unique values — faster than checking an array
```

**Shorthand property names**
```js
{ sku, name, qty: parseInt(qty) || 0 }
// sku and name are shorthand for sku: sku, name: name
// || 0 means "use 0 if parseInt returns NaN/falsy"
```

**`p.sku` specifically** — `p` is just the parameter name inside the arrow function, it represents each item in the pantry array as `.find()` loops through it. You could name it anything (`item`, `x`, `el`) — `p` is just short for "pantry item".

