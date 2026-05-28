let inventory = [];

function findProductIndex(name) {
  const lowerName = name.toLowerCase();
  return inventory.findIndex(product => product.name === lowerName);
}

function addProduct(product) {
  const index = findProductIndex(product.name);
  const lowerName = product.name.toLowerCase();

  if (index !== -1) {
    inventory[index].quantity += product.quantity;
    console.log(`${lowerName} quantity updated`);
  } else {
    inventory.push({ name: lowerName, quantity: product.quantity });
    console.log(`${lowerName} added to inventory`);
  }
}

function removeProduct(name, quantity) {
  const index = findProductIndex(name);
  const lowerName = name.toLowerCase();

  if (index === -1) {
    console.log(`${lowerName} not found`);
    return;
  }

  const product = inventory[index];

  if (product.quantity < quantity) {
    console.log(`Not enough ${lowerName} available, remaining pieces: ${product.quantity}`);
  } else {
    product.quantity -= quantity;
    if (product.quantity === 0) {
      inventory.splice(index, 1);
    } else {
      console.log(`Remaining ${lowerName} pieces: ${product.quantity}`);
    }
  }
}