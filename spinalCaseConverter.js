function spinalCase(str) {
  // 1. Put a space before any capital letter that is attached to a lowercase letter
  // Lookahead ensures we only match spaces/boundaries right before uppercase letters
  const camelCaseRegex = /([a-z])([A-Z])/g;
  let spacedStr = str.replace(camelCaseRegex, "$1 $2");

  // 2. Match all spaces, underscores, or consecutive spaces
  const separatorRegex = /[\s_]+/g;

  // 3. Swap those separators with hyphens and lowercase the entire text
  return spacedStr.replace(separatorRegex, "-").toLowerCase();
}