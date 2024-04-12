/**
 * CorsProxy.io
 * - A fast & simple way to fix CORS Errors
 * - The fastest CORS Proxy you'll find. It's free!
 * - All you have to do is prefix the destination URL with the URL of our proxy and it will handle the request on your behalf with appropriate CORS headers.
 */

export function corsProxy(url: string) {
  const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
  return proxyUrl;
}

/**
 * easy-cors-proxy
 * @see {@link https://github.com/yc-w-cn/easy-cors-proxy}
 */
export function easyCorsProxy(url: string) {
  const endpoint = process.env.NEXT_PUBLIC_EASY_CORS_PROXY_ENDPOINT;
  const accessToken = process.env.NEXT_PUBLIC_EASY_CORS_PROXY_ACCESS_TOKEN;
  const encodedUrl = encodeURIComponent(url);
  const proxyUrl = `${endpoint}/proxy?ACCESS_TOKEN=${accessToken}&URL=${encodedUrl}`;
  return proxyUrl;
}
