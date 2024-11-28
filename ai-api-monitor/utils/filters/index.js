// utils/filters/index.js
export const shouldInterceptRequest = (url) => {
  const keywords = ['openai', 'gpt', 'anthropic', 'huggingface'];
  return keywords.some(keyword => url.toLowerCase().includes(keyword));
};