// tests/background.test.js
describe('Request Interception', () => {
  test('should intercept AI API requests', () => {
    const url = 'https://api.openai.com/v1/chat/completions';
    expect(shouldInterceptRequest(url)).toBe(true);
  });
});