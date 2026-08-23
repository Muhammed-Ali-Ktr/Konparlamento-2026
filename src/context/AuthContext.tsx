'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'KATILIMCI' | 'SUPER_ADMIN' | 'YONETICI' | 'ICERIK_EDITORU' | 'KOMISYON_SORUMLUSU';
  status: 'BEKLEMEDE' | 'ONAYLANDI' | 'REDDEDILDI';
  committee?: string;
  duty?: string;
  avatar?: string;
  age?: number;
  grade?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (emailOrPhone: string, pin: string) => Promise<{ success: boolean; message: string }>;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: async () => ({ success: false, message: '' }),
  loginAsAdmin: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kon_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default approved demo participant user
      const defaultUser: UserProfile = {
        id: 'u-101',
        firstName: 'Muhammed Ali',
        lastName: 'Kıtır',
        email: 'muhammed@konparlamento.org',
        phone: '+90 555 999 8877',
        role: 'SUPER_ADMIN',
        status: 'ONAYLANDI',
        committee: 'Dışişleri Komisyonu',
        duty: 'Lead Developer & Delegasyon Başkanı',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        age: 21,
        grade: 'Üniversite 3. Sınıf'
      };
      setUser(defaultUser);
      localStorage.setItem('kon_user', JSON.stringify(defaultUser));
    }
  }, []);

  const login = async (emailOrPhone: string, pin: string): Promise<{ success: boolean; message: string }> => {
    // Check local applications / mock users
    if (pin.length < 4) {
      return { success: false, message: 'Lütfen geçerli 6 haneli şifre/PIN giriniz.' };
    }

    const newUser: UserProfile = {
      id: 'u-' + Date.now(),
      firstName: emailOrPhone.split('@')[0] || 'Kullanıcı',
      lastName: '',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@konparlamento.org`,
      role: 'KATILIMCI',
      status: 'ONAYLANDI',
      committee: 'Dışişleri Komisyonu',
      duty: 'Delegasyon Üyesi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    };

    setUser(newUser);
    localStorage.setItem('kon_user', JSON.stringify(newUser));
    return { success: true, message: 'Giriş başarılı!' };
  };

  const loginAsAdmin = () => {
    const adminUser: UserProfile = {
      id: 'admin-super',
      firstName: 'Admin',
      lastName: 'Yönetici',
      email: 'admin@konparlamento.org',
      role: 'SUPER_ADMIN',
      status: 'ONAYLANDI',
      duty: 'Sistem Yöneticisi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    };
    setUser(adminUser);
    localStorage.setItem('kon_user', JSON.stringify(adminUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kon_user');
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'YONETICI' || user?.role === 'ICERIK_EDITORU';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        login,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
