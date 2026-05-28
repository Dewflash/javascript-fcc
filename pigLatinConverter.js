function translatePigLatin(str) {
  // 1. Rule for words starting with a vowel (a, e, i, o, u)
  if (/^[aeiou]/i.test(str)) {
    return str + "way";
  }

  // 2. Rule for words starting with consonants or having no vowels
  // This regex targets all consonants at the very beginning up until the first vowel
  const consonantRegex = /^([^aeiou]+)(.*)$/i;
  
  if (consonantRegex.test(str)) {
    // Break the word into its captured parts using .replace() and backreferences
    return str.replace(consonantRegex, "$2$1ay");
  }

  return str + "ay";
}