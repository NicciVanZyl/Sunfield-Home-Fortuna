import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem('user')) || null
    );
    const [token, setToken] = useState(
        () => localStorage.getItem('token') || null
    );

    const login = (userData, tokenValue) => {
        setUser(userData);
        setToken(tokenValue);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenValue);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin,isUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
