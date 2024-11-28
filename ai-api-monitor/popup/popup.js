// Features:
// - Display intercepted requests
// - Real-time updates
// - Request details view
// - Export functionality

import { getRequests } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const requests = await getRequests();
  renderRequests(requests);
  setupEventListeners();
});

function renderRequests(requests) {
  const table = document.getElementById('requestsTable');
  table.innerHTML = requests.map(req => `
    <tr class="request-row" data-id="${req.id}">
      <td>${new Date(req.timestamp).toLocaleString()}</td>
      <td>${req.method}</td>
      <td>${req.url}</td>
      <td>${req.response?.statusCode || 'Pending'}</td>
      <td>
        <button onclick="showDetails('${req.id}')">Details</button>
      </td>
    </tr>
    <tr>
      <td colspan="5">
        <div id="details-${req.id}" class="details-view">
          ${JSON.stringify(req, null, 2)}
        </div>
      </td>
    </tr>
  `).join('');
}

function setupEventListeners() {
  document.getElementById('exportBtn').addEventListener('click', exportData);
  document.getElementById('search').addEventListener('input', filterRequests);
  document.getElementById('filterMethod').addEventListener('change', filterRequests);
}

async function exportData() {
  const requests = await getRequests();
  const blob = new Blob([JSON.stringify(requests, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    filename: 'ai-api-requests.json'
  });
}

function showDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display = details.style.display === 'none' ? 'block' : 'none';
}