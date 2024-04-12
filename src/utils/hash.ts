/**
 * Generate SHA-256 hash of the provided URL.
 * @param {string} url - The URL to hash.
 * @returns {Promise<string>} A promise that resolves with the SHA-256 hash of the URL.
 */
export async function generateHash(url: string): Promise<string> {
  // Convert the URL string to an array of bytes using TextEncoder.
  const encoder = new TextEncoder();
  const data = encoder.encode(url);

  // Generate the SHA-256 hash of the data asynchronously using the Web Crypto API.
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash buffer to an array of bytes.
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert the array of bytes to a hexadecimal string.
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // Return the hexadecimal representation of the SHA-256 hash.
  return hashHex;
}
