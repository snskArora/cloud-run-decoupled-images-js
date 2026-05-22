const runtimeConfig = {
  apiBaseUrl: window.RUNTIME_CONFIG?.API_BASE_URL || ''
};

const apiBaseUrlEl = document.getElementById('apiBaseUrl');
const statusBadge = document.getElementById('statusBadge');
const messageText = document.getElementById('messageText');
const serviceName = document.getElementById('serviceName');
const environment = document.getElementById('environment');
const version = document.getElementById('version');
const timestamp = document.getElementById('timestamp');
const toggle = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;

(function initTheme() {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  toggle?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
  });
})();

function setStatus(kind, text) {
  statusBadge.className = `badge ${kind}`;
  statusBadge.textContent = text;
}

async function loadStatus() {
  const base = runtimeConfig.apiBaseUrl.replace(/\/$/, '');
  apiBaseUrlEl.textContent = base || 'Not configured';

  if (!base) {
    setStatus('badge-error', 'Missing config');
    messageText.textContent = 'Set API_BASE_URL during frontend deployment so the UI can reach the backend service.';
    return;
  }

  try {
    const response = await fetch(`${base}/api/message`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    setStatus('badge-success', 'Connected');
    messageText.textContent = data.message || 'Backend reachable.';
    serviceName.textContent = data.service || '-';
    environment.textContent = data.environment || '-';
    version.textContent = data.version || '-';
    timestamp.textContent = data.timestamp || '-';
  } catch (error) {
    setStatus('badge-error', 'Unavailable');
    messageText.textContent = `Could not reach backend at ${base}. Check Cloud Run URL, ingress, and CORS configuration.`;
    serviceName.textContent = '-';
    environment.textContent = '-';
    version.textContent = '-';
    timestamp.textContent = '-';
  }
}

loadStatus();
