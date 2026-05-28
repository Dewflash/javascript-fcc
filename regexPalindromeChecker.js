const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

// Main function to evaluate the input
function checkPalindrome() {
  const originalText = textInput.value;

  // Test 4: Check if input is completely empty
  if (!originalText || originalText.trim() === "") {
    alert("Please input a value");
    return;
  }

  // Regex breakdown:
  // [^a-zA-Z0-9] matches anything that is NOT a lowercase letter, uppercase letter, or digit.
  // We explicitly include the global flag /g to swap every instance.
  // Note: Standard \W misses underscores (_), so this custom range ensures underscores are cleared too.
  const cleanRegex = /[^a-zA-Z0-9]/g;
  const cleanedText = originalText.toLowerCase().replace(cleanRegex, "");

  // Reverse the cleaned text string to run the comparison
  const reversedText = cleanedText.split("").reverse().join("");

  // Determine message template based on matching evaluation
  if (cleanedText === reversedText) {
    resultDiv.textContent = `${originalText} is a palindrome.`;
  } else {
    resultDiv.textContent = `${originalText} is not a palindrome.`;
  }
}

// Attach event listener to the button element execution handler
checkBtn.addEventListener("click", checkPalindrome);
