// Google Identity Services integration
// Docs: https://developers.google.com/identity/gsi/web

export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-gsi')) { resolve(); return; }
    const script = document.createElement('script');
    script.id = 'google-gsi';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function initializeGoogleOneTap({ onSuccess, onError }) {
  if (!CLIENT_ID || !window.google) return;
  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: ({ credential }) => {
      const user = decodeJwt(credential);
      if (user) onSuccess(user, credential);
      else onError?.(new Error('Invalid credential'));
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });
  window.google.accounts.id.prompt();
}

export function renderGoogleButton(elementId, options = {}) {
  if (!CLIENT_ID || !window.google) return;
  window.google.accounts.id.renderButton(
    document.getElementById(elementId),
    {
      theme: 'outline',
      size: 'large',
      width: options.width || 300,
      text: options.text || 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      ...options,
    }
  );
}

export function revokeGoogleToken(email, callback) {
  if (!window.google) return;
  window.google.accounts.id.revoke(email, callback);
}
