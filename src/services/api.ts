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
  getAll: () => request<any[]>('/api/Marca'),
  getById: (id: string) => request<any>(`/api/Marca/${id}`),
  create: (data: any) => request<any>('/api/Marca', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/api/Marca/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/api/Marca/${id}`, {
    method: 'DELETE',
  }),
};

// MATERIAIS
export const materiaisAPI = {
  getAll: () => request<any[]>('/Material'),
  getById: (id: string) => request<any>(`/Material/${id}`),
  create: (data: any) => request<any>('/Material', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Material/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Material/${id}`, {
    method: 'DELETE',
  }),
};

// FUNCIONÁRIOS
export const funcionariosAPI = {
  getAll: () => request<any[]>('/Funcionario'),
  getById: (id: string) => request<any>(`/Funcionario/${id}`),
  create: (data: any) => request<any>('/Funcionario', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Funcionario/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Funcionario/${id}`, {
    method: 'DELETE',
  }),
};

// SETORES
export const setoresAPI = {
  getAll: () => request<any[]>('/Setor'),
  getById: (id: string) => request<any>(`/Setor/${id}`),
  create: (data: any) => request<any>('/Setor', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Setor/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Setor/${id}`, {
    method: 'DELETE',
  }),
};

// ENTRADAS
export const entradasAPI = {
  getAll: () => request<any[]>('/Entrada'),
  getById: (id: string) => request<any>(`/Entrada/${id}`),
  create: (data: any) => request<any>('/Entrada', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Entrada/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Entrada/${id}`, {
    method: 'DELETE',
  }),
};

// SAÍDAS
export const saidasAPI = {
  getAll: () => request<any[]>('/Saida'),
  getById: (id: string) => request<any>(`/Saida/${id}`),
  create: (data: any) => request<any>('/Saida', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/Saida/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/Saida/${id}`, {
    method: 'DELETE',
  }),
};

// USUÁRIOS
export const usuariosAPI = {
  getAll: () => request<any[]>('/api/Usuario'),
  getById: (id: string) => request<any>(`/api/Usuario/${id}`),
  create: (data: any) => request<any>('/api/Usuario', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => request<any>(`/api/Usuario/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => request<void>(`/api/Usuario/${id}`, {
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
