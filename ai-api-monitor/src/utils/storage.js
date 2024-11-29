// utils/storage.js
export const saveRequests = async (requests) => {
  // Limit stored requests to prevent memory issues
  const MAX_REQUESTS = 1000;
  const trimmedRequests = requests.slice(-MAX_REQUESTS);
  await chrome.storage.local.set({ requests: trimmedRequests });
};

export const getRequests = async () => {
  const { requests = [] } = await chrome.storage.local.get('requests');
  return requests;
};

// Add request cleanup
export const cleanupOldRequests = async () => {
  const RETENTION_DAYS = 7;
  const { requests = [] } = await chrome.storage.local.get('requests');
  const cutoff = Date.now() - (RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const filteredRequests = requests.filter(req => new Date(req.timestamp) > cutoff);
  await saveRequests(filteredRequests);
};