// background.js
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

function shouldInterceptRequest// background.js
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

function shouldInterceptRequest