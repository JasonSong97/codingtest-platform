import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { decodeJwt, loadGoogleScript, CLIENT_ID, revokeGoogleToken } from '../lib/googleIdentity';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [storedUser, setStoredUser] = useLocalStorage('cp-user', null);
  const [user, setUser] = useState(storedUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (CLIENT_ID) loadGoogleScript().catch(console.error);
  }, []);

  const loginWithCredential = (credential) => {
    const decoded = decodeJwt(credential);
    if (!decoded) return;
    const u = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture,
      locale: decoded.locale,
      emailVerified: decoded.email_verified,
      lastLogin: new Date().toISOString(),
    };
    setUser(u);
    setStoredUser(u);
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
    if (window.google) window.google.accounts.id.disableAutoSelect();
  };

  const disconnectGoogle = () => {
    if (user?.email) {
      revokeGoogleToken(user.email, () => logout());
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithCredential, logout, disconnectGoogle, hasClientId: !!CLIENT_ID }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
