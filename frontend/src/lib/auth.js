// Authentication
const TOKEN_KEY = 'siksha_token';
const USER_KEY = 'siksha_user';

export function setAuth(token, user) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
export function getToken() { 
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function getUser() { 
  try {
    const s = localStorage.getItem(USER_KEY);
    return s ? JSON.parse(s) : null;
  } catch (err) {
    return null;
  }
}

// Helper that attaches Authorization header when token exists
export async function authFetch(url, opts = {}) {
  const token = getToken();
  const headers = opts.headers ? { ...opts.headers } : {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { ...opts, headers });
}

export default {
  setAuth,
  clearAuth,
  getToken,
  getUser,
  authFetch
}
