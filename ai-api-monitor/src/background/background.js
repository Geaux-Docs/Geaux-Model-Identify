// background.js
// Handles:
// - Network request interception
// - Request filtering
// - Data storage management
// - Response capture

import { shouldInterceptRequest } from '@utils/filters';
import { saveRequests, getRequests } from '@utils/storage';

// Remove duplicate imports
// import { filterRequest } from './utils/filters.js';
// import { saveRequest } from './utils/storage.js';

const init = async () => {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
};

let interceptedRequests = [];
const keywords = ['openai', 'gpt', 'anthropic', 'huggingface'];

// Single initialization
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ 
    keywords,
    requests: []
  });
  console.log('Extension installed');
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (shouldInterceptRequest(details.url)) {
      const request = {
        id: Date.now(),
        url: details.url,
        method: details.method,
        timestamp: new Date().toISOString(),
        requestBody: details.requestBody
      };
      interceptedRequests.push(request);
      saveRequests(interceptedRequests);
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

init().catch(console.error);