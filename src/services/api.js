// Minimal fetch-based API client for MIS
// Use same-origin '/api' by default so requests go to /api/... (works in prod and with Vite proxy in dev)
const API_BASE_URL = import.meta?.env?.VITE_API_URL || '/api';

const readAuth = () => {
	try {
		const raw = localStorage.getItem('auth');
		return raw ? JSON.parse(raw) : null;
	} catch (_) {
		return null;
	}
};

const writeAuth = (auth) => {
	try {
		localStorage.setItem('auth', JSON.stringify(auth));
	} catch (_) {
		// ignore
	}
};

const getAuthHeader = () => {
	try {
		const stored = localStorage.getItem('auth');
		if (!stored) return {};
		const { accessToken } = JSON.parse(stored);
		return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
	} catch (e) {
		return {};
	}
};

let refreshPromise = null;

const refreshTokens = async () => {
	if (!refreshPromise) {
		const auth = readAuth();
		if (!auth?.refreshToken) throw new Error('Missing refresh token');
		refreshPromise = (async () => {
			const url = `${API_BASE_URL}/auth/refresh-token?refreshToken=${encodeURIComponent(auth.refreshToken)}`;
			const res = await fetch(url, { method: 'POST' });
			if (!res.ok) throw new Error('Failed to refresh token');
			const data = await res.json();
			const updated = {
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
				expiresIn: data.expiresIn,
				roles: data.roles,
				permissions: data.permissions,
				user: data.user,
			};
			writeAuth(updated);
			return updated;
		})()
			.finally(() => {
				refreshPromise = null;
			});
	}
	return refreshPromise;
};

const request = async (path, { method = 'GET', headers = {}, body, isForm = false, _retry } = {}) => {
	const url = `${API_BASE_URL}${path}`;
	const finalHeaders = {
		...(!isForm ? { 'Content-Type': 'application/json' } : {}),
		...getAuthHeader(),
		...headers,
	};

	const response = await fetch(url, {
		method,
		headers: finalHeaders,
		body: body && !isForm ? JSON.stringify(body) : body,
	});

	let data = null;
	const contentType = response.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		data = await response.json();
	} else {
		data = await response.text();
	}

	if (!response.ok) {
		if (response.status === 401 && !_retry) {
			try {
				await refreshTokens();
				return request(path, { method, headers, body, isForm, _retry: true });
			} catch (_) {
				// fallthrough to throw original error
			}
		}
		const message = typeof data === 'string' ? data : (data?.message || 'Request failed');
		throw new Error(message);
	}

	return data;
};

export const authApi = {
	login: (email, password, rememberMe = false) =>
		request('/auth/login', { method: 'POST', body: { email, password, rememberMe } }),
	refresh: (refreshToken) =>
		request(`/auth/refresh-token?refreshToken=${encodeURIComponent(refreshToken)}`, { method: 'POST' }),
	logout: () => request('/auth/logout', { method: 'POST', headers: getAuthHeader() }),
	validateToken: () => request('/auth/validate-token', { method: 'POST', headers: getAuthHeader() }),
	changePassword: (currentPassword, newPassword) =>
		request(`/auth/change-password?currentPassword=${encodeURIComponent(currentPassword)}&newPassword=${encodeURIComponent(newPassword)}`, { method: 'POST' }),
	forgotPassword: (email) => request(`/auth/forgot-password?email=${encodeURIComponent(email)}`, { method: 'POST' }),
	verifyOtp: (email, otp) => request(`/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, { method: 'POST' }),
	resetPassword: (resetToken, newPassword) =>
		request(`/auth/reset-password?resetToken=${encodeURIComponent(resetToken)}&newPassword=${encodeURIComponent(newPassword)}`, { method: 'POST' }),
};

export const api = { request, auth: authApi };

export default api;


