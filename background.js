// background.js
// Handles:
// - Network request interception
// - Request filtering
// - Data storage management
// - Response capture

let interceptedRequests = [];
let keywords = ['openai', 'gpt', 'ai', 'llm', 'anthropic', 'huggingface'];

chrome.storage.local.get(['keywords'], (result) => {
  if (result.keywords) {
    keywords = result.keywords;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    if (shouldInterceptRequest(details.url)) {
      const request = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        url: details.url,
        method: details.method,
        type: details.type,
        requestHeaders: {},
        requestBody: details.requestBody,
      };
      
      interceptedRequests.push(request);
      chrome.storage.local.set({ requests: interceptedRequests });
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (shouldInterceptRequest(details.url)) {
      const requestIndex = interceptedRequests.findIndex(req => req.url === details.url && req.method === details.method);
      if (requestIndex !== -1) {
        const response = {
          statusCode: details.statusCode,
          responseHeaders: details.responseHeaders,
        };
        interceptedRequests[requestIndex].response = response;
        chrome.storage.local.set({ requests: interceptedRequests });
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

function shouldInterceptRequest(url) {
  return keywords.some(keyword => url.includes(keyword));
}