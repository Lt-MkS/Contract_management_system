import axios from 'axios';
import { Blueprint, Contract } from '../types';

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blueprintAPI = {
  getAll: async (): Promise<Blueprint[]> => {
    const response = await api.get('/blueprints');
    return response.data;
  },
  
  getById: async (id: string): Promise<Blueprint> => {
    const response = await api.get(`/blueprints/${id}`);
    return response.data;
  },
  
  create: async (blueprint: Omit<Blueprint, 'id'>): Promise<Blueprint> => {
    const response = await api.post('/blueprints', blueprint);
    return response.data;
  },
  
  update: async (id: string, blueprint: Omit<Blueprint, 'id'>): Promise<Blueprint> => {
    const response = await api.put(`/blueprints/${id}`, blueprint);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/blueprints/${id}`);
  },
};

export const contractAPI = {
  getAll: async (): Promise<Contract[]> => {
    const response = await api.get('/contracts');
    return response.data;
  },
  
  getById: async (id: string): Promise<Contract> => {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },
  
  create: async (contract: Omit<Contract, 'id'>): Promise<Contract> => {
    const response = await api.post('/contracts', contract);
    return response.data;
  },
  
  updateStatus: async (id: string, status: Contract['status']): Promise<Contract> => {
    const response = await api.patch(`/contracts/${id}/status`, { status });
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/contracts/${id}`);
  },
};

export default api;
