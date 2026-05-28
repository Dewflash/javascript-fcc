function generatePassword(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";

  for (let i = 0; i < length; i++) {
    // Math.random() gives a decimal between 0 and 1
    // Multiplying by chars.length scales it to our range
    // Math.floor() rounds it down to a whole number index
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

// Store the result of calling the function
const password = generatePassword(12);

// Log the final message
console.log("Generated password: " + password);