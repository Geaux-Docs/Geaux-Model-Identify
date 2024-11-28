document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("apiData", (data) => {
      const apiData = data.apiData || [];
      const table = document.getElementById("apiTable");
  
      apiData.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.url}</td>
          <td>${entry.method}</td>
          <td>${JSON.stringify(entry.headers)}</td>
          <td>${JSON.stringify(entry.payload)}</td>
        `;
        table.appendChild(row);
      });
    });
  });
  