// --- STEP 1: GRAB HTML ELEMENTS ---
// Link the JavaScript to the actual fields and buttons on your webpage using their IDs.
const messageInput = document.getElementById("message-input");       // The text box where users type their message
const result = document.getElementById("result-message");             // The paragraph where the "Spam / Not Spam" result will show
const checkMessageButton = document.getElementById("check-message-btn"); // The button the user clicks to run the check

// --- STEP 2: DEFINE SPAM PATTERNS (REGEX) ---
// Each variable holds a specific pattern rule. The '/i' at the end makes them ignore uppercase/lowercase.

// Matches the exact phrase "please help" OR "assist me"
const helpRegex = /please help|assist me/i;

// Matches a number followed by an optional scale word (like hundred/million) and the word "dollars" (e.g., "100 dollars", "5 million dollars")
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;

// see [e3] as like each character which has been grouped up
// '(?:^|\s)' means it must start at the beginning of the text OR after a space (checks whole words)

// Matches "free money", but accounts for spammers replacing letters with numbers (e = 3, o = 0)

const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

// Matches "stock alert", checking for heavy leetspeak tricks (s=5, t=7, o=0, c can be brackets like {, [, (, and a=4/@, e=3)
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;

// Matches "dear friend", mapping vowels to lookalike numbers and symbols (e=3, a=@/4, i=1/|), ensuring it sits as a standalone phrase
const dearRegex = /(?:^|\s)d[e3][a@4]r\s+fr[i1|][e3]nd(?:$|\s)/i;

// --- STEP 3: CREATE THE FILTER GROUP ---
// Put all your individual regex rules into a single array (a list) so you can check them together easily.
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// --- STEP 4: THE DETECTOR FUNCTION ---
// 'isSpam' is an arrow function that takes the user's message ('msg') as an input.
// '.some()' loops through your denyList array. If even ONE regex pattern matches the text (.test(msg) === true), the whole function outputs 'true'.
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// --- STEP 5: THE USER INTERACTION HANDLER ---
// Listen for when the user physically clicks the "Check Message" button.
checkMessageButton.addEventListener("click", () => {
  
  // Safety Check: If the text input box is completely blank, stop everything and show an alert.
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return; // Exits the function early so it doesn't process empty text
  }

  // If there is text, pass it into our 'isSpam' detector function using a ternary operator (a mini if/else statement):
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."          // If isSpam returns true, display this text
    : "This message does not seem to contain any spam."; // If isSpam returns false, display this text

  // Clear the input box automatically so it's fresh and ready for the user's next message.
  messageInput.value = "";
});