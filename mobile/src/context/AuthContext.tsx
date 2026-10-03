import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { User } from '../models/User';
import { getCurrentUser, onAuthChange } from '../services/authService';

type AuthState = {
  user: User | null;
  // true mientras se lee la sesión guardada en el celular al abrir la app.
  isLoading: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Se entera de cada ingreso, registro o cierre de sesión.
    return onAuthChange(setUser);
  }, []);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
