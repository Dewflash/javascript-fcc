// Tests 1-4: Select the functional elements using their exact IDs
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

// Tests 5-6: Select the flag checkbox elements
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

// Tests 7-11: Build a function to collect active flags from the checkboxes
function getFlags() {
  let flags = "";
  if (caseInsensitiveFlag.checked) {
    flags += "i";
  }
  if (globalFlag.checked) {
    flags += "g";
  }
  return flags;
}

// Tests 12-20: Process highlighting and result formatting upon click
testButton.addEventListener("click", () => {
  const patternText = regexPattern.value;
  // Use innerText to grab raw content safely before wrapping it with spans
  const rawString = stringToTest.innerText;
  const flags = getFlags();

  // Guard clause: If the user inputs nothing into the pattern block, clear the view
  if (!patternText) {
    testResult.innerText = "no match";
    return;
  }

  try {
    // Generate a dynamic expression object using the constructor
    const regex = new RegExp(patternText, flags);

    // Run string.match to find individual segments
    const matches = rawString.match(regex);

    if (matches) {
      // Test 17-19: Display matched parts separated by a comma and a space
      // Note: If /g flag is missing, matches only contains the first match asset.
      if (flags.includes("g")) {
        testResult.innerText = matches.join(", ");
      } else {
        testResult.innerText = matches[0];
      }

      // Tests 12-15: Map the matches into highlight span buckets inside the HTML
      // We pass a matching replacement callback function to ensure each unique matched segment 
      // preserves its literal casing value inside the generated template string.
      stringToTest.innerHTML = rawString.replace(regex, (match) => {
        return `<span class="highlight">${match}</span>`;
      });

    } else {
      // Tests 16, 20: Fallback rule handling if no matching instances exist
      testResult.innerText = "no match";
      stringToTest.innerHTML = rawString; // Keep original text untouched
    }
  } catch (error) {
    // Gracefully catch invalid pattern syntax (like unclosed brackets) to prevent dashboard crashes
    testResult.innerText = "no match";
  }
});