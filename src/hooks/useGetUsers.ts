// Hook para requisições GET de usuários
import { useCallback } from 'react';
import { User } from '../interfaces/user.interface';

const API_URL = import.meta.env.VITE_API_URL;

export function useGetUsers() {
  // GET /users
  const getAll = useCallback(async () => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  }, []);

  // GET /users/:id
  const getById = useCallback(async (id: number) => {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
  }, []);

  return {
    getAll,
    getById,
  };
}
