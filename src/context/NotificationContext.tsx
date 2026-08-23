'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'BASVURU_ONAY' | 'BASVURU_RED' | 'BILMECE_SONUC' | 'FOTOGRAF_ONAY' | 'FOTOGRAF_RED' | 'DUYURU' | 'SISTEM';
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  addNotification: () => {},
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('kon_notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultNotifs: NotificationItem[] = [
        {
          id: 'n-1',
          title: 'Konparlamento 2026 Platformuna Hoş Geldiniz!',
          message: 'Etkinlik başvuruları ve bilmece sistemi aktiftir.',
          type: 'DUYURU',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'n-2',
          title: 'Başvuru Durumu Bildirimi',
          message: 'Başvurunuz onaylandığında bu alandan ve SMS/E-posta yoluyla bilgilendirileceksiniz.',
          type: 'SISTEM',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ];
      setNotifications(defaultNotifs);
      localStorage.setItem('kon_notifications', JSON.stringify(defaultNotifs));
    }
  }, []);

  const saveNotifs = (notifs: NotificationItem[]) => {
    setNotifications(notifs);
    localStorage.setItem('kon_notifications', JSON.stringify(notifs));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    saveNotifs(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveNotifs(updated);
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'DUYURU') => {
    const newNotif: NotificationItem = {
      id: 'n-' + Date.now(),
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    saveNotifs([newNotif, ...notifications]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
