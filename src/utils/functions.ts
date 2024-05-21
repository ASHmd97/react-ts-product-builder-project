/**
 * Description
 * @param {string} text - text to be sliced
 * @param {number} maxLength - max length of the text
 * @returns {string} - sliced text with ellipsis
 */
export function txtSlicer(text: string, maxLength: number = 40): string {
  return text.length >= maxLength ? `${text.slice(0, maxLength)}...` : text;
}
