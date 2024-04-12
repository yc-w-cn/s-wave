/**
 * Combine a base path with a relative path, ensuring correct formatting.
 * If either base or path is undefined or empty, it returns an empty string.
 *
 * @param {string | undefined} base - The base path.
 * @param {string | undefined} path - The relative path.
 * @returns {string} The combined path.
 */
export function combine(
  base: string | undefined = "",
  path: string | undefined = ""
) {
  if (!base && !path) {
    return "";
  }

  if (base && path) {
    const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return trimmedBase + "/" + trimmedPath;
  }

  return (base || "") + (path || "");
}

/**
 * Check if a given URL string is valid.
 * @param {string} url - The URL string to validate.
 * @returns {boolean} - Returns true if the URL is valid, otherwise false.
 */ 
export function isValidUrl(url: string): boolean {
  try {
      new URL(url);
      return true;
  } catch (error) {
      return false;
  }
}
