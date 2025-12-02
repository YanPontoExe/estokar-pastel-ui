// API Client para comunicação com Spring Boot
const API_BASE_URL = 'http://localhost:8080';

// Helper para requisições HTTP
async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição para ${endpoint}:`, error);
    throw error;
  }
}



// MARCAS
export const marcasAPI = {
  getAll: () => request<any[]>('/Marcas'),
  getById: (id: string) => request<any>(`/Marcas/${id}`),
  create: (data: any) => request<any>('/Marcas', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Marcas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Marcas/${id}`, {
    method: 'DELETE',
  }),
};

// MATERIAIS
export const materiaisAPI = {
  getAll: () => request<any[]>('/Materiais'),
  getById: (id: string) => request<any>(`/Materiais/${id}`),
  create: (data: any) => request<any>('/Materiais', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Materiais/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Materiais/${id}`, {
    method: 'DELETE',
  }),
};

// FUNCIONÁRIOS
export const funcionariosAPI = {
  getAll: () => request<any[]>('/Funcionarios'),
  getById: (id: string) => request<any>(`/Funcionarios/${id}`),
  create: (data: any) => request<any>('/Funcionarios', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Funcionarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Funcionarios/${id}`, {
    method: 'DELETE',
  }),
};

// SETORES
export const setoresAPI = {
  getAll: () => request<any[]>('/Setores'),
  getById: (id: string) => request<any>(`/Setores/${id}`),
  create: (data: any) => request<any>('/Setores', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Setores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Setores/${id}`, {
    method: 'DELETE',
  }),
};

// ENTRADAS
export const entradasAPI = {
  getAll: () => request<any[]>('/Entradas'),
  getById: (id: string) => request<any>(`/Entradas/${id}`),
  create: (data: any) => request<any>('/Entradas', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Entradas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Entradas/${id}`, {
    method: 'DELETE',
  }),
};

// SAÍDAS
export const saidasAPI = {
  getAll: () => request<any[]>('/Saidas'),
  getById: (id: string) => request<any>(`/Saidas/${id}`),
  create: (data: any) => request<any>('/Saidas', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Saidas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Saidas/${id}`, {
    method: 'DELETE',
  }),
};

// USUÁRIOS
export const usuariosAPI = {
  getAll: () => request<any[]>('/Usuarios'),
  getById: (id: string) => request<any>(`/Usuarios/${id}`),
  create: (data: any) => request<any>('/Usuarios', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Usuarios/${id}`, {
    method: 'DELETE',
  }),
};

// AUTENTICAÇÃO
export const authAPI = {
  login: (username: string, password: string) => request<{ token: string; user: any }>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }),
  signup: (username: string, password: string) => request<any>('/cadastrar', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }),
};

// DASHBOARD
export const dashboardAPI = {
  getStats: () => request<any>('/Dashboard/stats'),
  getRecentActivity: () => request<any[]>('/Dashboard/recent-activity'),
  getLowStock: () => request<any[]>('/Dashboard/low-stock'),
};

export { API_BASE_URL };
