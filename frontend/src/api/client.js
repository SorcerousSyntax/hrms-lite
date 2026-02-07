const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const parts = [data.message];
    if (data.errors?.length) parts.push(...data.errors.map((e) => e.message || e.msg));
    const msg = parts.filter(Boolean).join('. ') || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

export const api = {
  getEmployees: () => request('/employees'),
  addEmployee: (body) => request('/employees', { method: 'POST', body: JSON.stringify(body) }),
  deleteEmployee: (id) => request(`/employees/${id}`, { method: 'DELETE' }),

  markAttendance: (body) => request('/attendance', { method: 'POST', body: JSON.stringify(body) }),
  getAttendance: (employeeId, params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/attendance/employee/${employeeId}${q ? `?${q}` : ''}`);
  },

  getStats: () => request('/stats'),
};
