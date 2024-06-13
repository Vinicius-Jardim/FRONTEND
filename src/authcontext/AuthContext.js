import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutos

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const navigate = useNavigate();

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    const timer = setTimeout(logout, INACTIVITY_TIME);
    setInactivityTimer(timer);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://127.0.0.1:3000/auth/me', {
        headers: {
          'x-access-token': token
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser({ ...data.decoded });
        })
        .catch(error => {
          console.error('Erro ao verificar token:', error);
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
      resetInactivityTimer();
    } else {
      setLoading(false);
    }

    const events = ['mousemove', 'keydown'];
    const resetTimer = () => resetInactivityTimer();
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const login = async (name, password) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });
      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', token);
      const userResponse = await fetch('http://127.0.0.1:3000/auth/me', {
        headers: {
          'x-access-token': token
        }
      });
      const userData = await userResponse.json();
      setUser({ ...userData.decoded, name: userData.decoded.name });
      resetInactivityTimer();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
