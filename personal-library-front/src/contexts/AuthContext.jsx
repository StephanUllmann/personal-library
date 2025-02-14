/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from 'react';
import { createContext } from 'react';
import { ToasterContext } from './ToasterContext';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { toaster } = useContext(ToasterContext);
  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      setUser(data.user);
      toaster.success(`Welcome on Board!`);
      navigate('/books');
    } catch (error) {
      toaster.error(error.message);
    }
  };

  const login = async (credentials) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      toaster.success(`Welcome ${data.user.firstName}!`);
      navigate('/books');
    } catch (error) {
      toaster.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      setUser(null);
      localStorage.removeItem('token');
      toaster.success(`Logged out!`);
      navigate('/');
    } catch (error) {
      toaster.error(error.message);
    }
  };

  const sendMe = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me/${user._id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ login, user, sendMe, logout, signup }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
