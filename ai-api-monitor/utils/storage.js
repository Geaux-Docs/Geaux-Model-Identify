// utils/storage.js
export const saveRequests = async (requests) => {
  await chrome.storage.local.set({ requests });
};

export const getRequests = async () => {
  const { requests = [] } = await chrome.storage.local.get('requests');
  return requests;
};