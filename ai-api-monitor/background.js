// background.js
// Handles:
// - Network request interception
// - Request filtering
// - Data storage management
// - Response capture

import { filterRequest } from './utils/filters.js';
import { saveRequest } from './utils/storage.js';
import { shouldInterceptRequest } from './utils/filters/index.js';
import { saveRequests, getRequests } from './utils/storage.js';


let interceptedRequests = [];
const keywords = ['openai', 'gpt', 'anthropic', 'huggingface'];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ keywords });
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (shouldInterceptRequest(details.url)) {
      const request = {
        id: Date.now(),
        url: details.url,
        method: details.method,
        timestamp: new Date().toISOString()
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