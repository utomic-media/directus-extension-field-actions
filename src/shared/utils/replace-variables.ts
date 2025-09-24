/**
 * Replaces placeholders in the format {{ key }} within the given text
 * @param text The text containing placeholders
 * @param variables An object mapping variable names to their values
 * @returns The text with placeholders replaced by their corresponding values
 */
export function replaceVariables(text: string, variables: Record<string, string>): string {
  return text.replace(/(\{\{\s*(\w+)\s*\}\})/g, (matchedString: string, _fullMatch: string, key: string): string => {
    if (variables.hasOwnProperty(key) && typeof variables[key] === 'string') {
      return variables[key];
    }
    return matchedString; // Preserve the original format of the placeholder
  });
}
