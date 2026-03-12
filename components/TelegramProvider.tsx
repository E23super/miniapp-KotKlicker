'use client';

import { useEffect } from 'react';
import { init, backButton, miniApp, useRawInitData } from '@telegram-apps/sdk-react';

export default function TelegramProvider() {
  const rawInitData = useRawInitData();

  useEffect(() => {
    try {
      init(); // Инициализация SDK
      
      // Сохраняем данные для авторизации
      if (rawInitData) {
        localStorage.setItem('telegram-init-data', rawInitData);
        
        // Можно распарсить и получить данные пользователя
        const userData = JSON.parse(decodeURIComponent(
          rawInitData.split('&').find(p => p.startsWith('user='))?.split('=')[1] || '{}'
        ));
        console.log('Пользователь:', userData);
      }
      
      // Настройка кнопки "Назад"
      if (backButton.mount.isAvailable()) {
        backButton.mount();
        backButton.onClick(() => {
          window.history.back();
        });
      }
      
      miniApp.mountSync();
      
    } catch (err) {
      console.error('Telegram SDK init failed:', err);
    }
  }, [rawInitData]);

  return null;
}