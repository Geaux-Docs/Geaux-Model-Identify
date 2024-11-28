document.addEventListener("DOMContentLoaded", () => {
    const keywordsInput = document.getElementById("keywords");
    chrome.storage.local.get("keywords", (data) => {
      keywordsInput.value = data.keywords ? data.keywords.join("\n") : "";
    });
  
    document.getElementById("save").addEventListener("click", () => {
      const keywords = keywordsInput.value.split("\n").map((k) => k.trim());
      chrome.storage.local.set({ keywords });
    });
  });
  